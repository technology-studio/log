/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-16T22:24:02+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

export const CYCLIC_ARRAY = '[CYCLIC]'
export const CYCLIC_OBJECT = '{CYCLIC}'

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

export const payloadProcessor = (payload?: any) => suppressFreezing(payload)
