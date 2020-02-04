/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2017-12-28T08:25:08+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import {
  configManager,
  isNodeEnvironmentEnabled,
  type Level,
} from '@txo-peer-dep/log'

export const isLoggerEnabled = (loggerKey: string): boolean => (
  isNodeEnvironmentEnabled(configManager.config.loggerConfigMap && configManager.config.loggerConfigMap[loggerKey])
)

export const getDefaultLevel = (): Level => (
  configManager.config.defaultLevelForNodeEnvironmentMap && process.env.NODE_ENV
    ? configManager.config.defaultLevelForNodeEnvironmentMap[process.env.NODE_ENV]
    : configManager.config.defaultLevelForUnknownNodeEnvironment
)