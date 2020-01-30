/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-16T22:24:02+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

const SUPPRESSED_ARRAY = '[SUPPRESSED]'
const SUPPRESSED_OBJECT = '{SUPPRESSED}'
const CYCLIC_ARRAY = '[CYCLIC]'
const CYCLIC_OBJECT = '{CYCLIC}'

export const suppressFreezing = (payload?: any, parents: any[] = [], level: number = 0) => {
  if (level > 10) {
    return
  }
  if (payload) {
    const _parents = [...parents, payload]
    if (Array.isArray(payload)) {
      if (parents.indexOf(payload) !== -1) {
        return CYCLIC_ARRAY
      }
      return payload.map(item => suppressFreezing(item, _parents, level + 1))
    } else if (typeof payload === 'object') {
      const objectPayload = payload
      if (parents.indexOf(objectPayload) !== -1) {
        return CYCLIC_OBJECT
      }

      return Object.keys(objectPayload).reduce((result, key) => {
        result[key] = suppressFreezing(objectPayload[key], _parents, level + 1)
        return result
      }, {})
    }
  }
  return payload
}

export const suppressFreezingReact = (payload?: any, parents?: any[] = []) => {
  if (payload) {
    const _parents = [...parents, payload]
    if (Array.isArray(payload)) {
      if (parents.indexOf(payload) !== -1) {
        return CYCLIC_ARRAY
      }
      return payload.map(item => suppressFreezing(item, _parents))
    } else if (typeof payload === 'object') {
      if (parents.indexOf(payload) !== -1) {
        return CYCLIC_OBJECT
      }
      if (payload.hasOwnProperty('refs')) {
        return SUPPRESSED_OBJECT
      }
      const { children, ...rest } = payload

      const restSuppressed = rest && Object.keys(rest).reduce((result, key) => {
        result[key] = suppressFreezing(rest[key], _parents)
        return result
      }, {})
      return children ? { children: SUPPRESSED_ARRAY, ...restSuppressed } : { ...restSuppressed }
    }
  }
  return payload
}

export const payloadProcessor = (payload?: any) => suppressFreezing(payload)
export const payloadProcessorReact = (payload?: any) => suppressFreezingReact(payload)
