/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2017-12-28T08:25:08+01:00
 * @Copyright: Technology Studio
**/

import type { Level } from '@txo-peer-dep/log'
import {
  configManager,
  isNodeEnvironmentEnabled,
} from '@txo-peer-dep/log'

export const isLoggerEnabled = (loggerKey: string): boolean => (
  isNodeEnvironmentEnabled(configManager.config.loggerConfigMap?.[loggerKey])
)

export const getDefaultLevel = (): Level => (
  configManager.config.defaultLevelForNodeEnvironmentMap && process.env.NODE_ENV
    ? configManager.config.defaultLevelForNodeEnvironmentMap[process.env.NODE_ENV]
    : configManager.config.defaultLevelForUnknownNodeEnvironment
)
