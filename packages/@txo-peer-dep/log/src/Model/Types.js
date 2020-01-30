/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2017-12-28T08:39:28+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

export const levels = {
  NONE: 0,
  ERROR: 1,
  WARNING: 2,
  INFO: 3,
  DEBUG: 4,
}

export type Level = $Values<typeof levels>

export type Options = {
  important: boolean,
}

export type WriteLog = (level: Level, name: string, namespace: string, message: string, payload?: any, options?: Options) => void
