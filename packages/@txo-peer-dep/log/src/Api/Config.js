/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2017-12-28T08:25:08+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import { ConfigManager } from '@txo/config-manager'
import {
  type Level,
  type Options,
  type WriteLog,
  levels,
} from '../Model/Types'

import {
  payloadProcessor,
} from './Utils'

export type {
  Level,
  Options,
  WriteLog,
}
export {
  levels,
  payloadProcessor,
}

type LoggerConfig = {
  writeLog: WriteLog,
  nodeEnvironmentList: string[],
}

type LoggerConfigMap = {
  [string]: LoggerConfig,
}

export type Config = {
  loggerConfigMap?: LoggerConfigMap,
  defaultLevelForNodeEnvironmentMap?: {
    [string]: Level,
  },
  defaultLevelForUnknownNodeEnvironment: Level,
  levelOverride?: {
    level: Level,
    namespacePatternList: string[],
  },
  payloadProcessor: (payload?: any) => any,
}

export const configManager: ConfigManager<Config> = new ConfigManager({
  defaultLevelForUnknownNodeEnvironment: levels.NONE,
  payloadProcessor,
})

export const isNodeEnvironmentEnabled = (loggerConfig?: LoggerConfig): boolean => (
  !!(loggerConfig && process.env.NODE_ENV && loggerConfig.nodeEnvironmentList.indexOf(process.env.NODE_ENV) !== -1)
)
