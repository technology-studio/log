/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2017-12-27T11:07:00+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import type {
  Level,
  Options,
  WriteLog,
} from '../Model/Types'

import {
  configManager,
  isNodeEnvironmentEnabled,
  type Config,
} from '../Config'

class LogManager {
  _writeLogList: WriteLog[]

  constructor () {
    this.syncFromConfig(configManager.config)
    configManager.subscribe(this.onConfigChange)
  }

  onConfigChange = (config: Config) => {
    this.syncFromConfig(config)
  }

  syncFromConfig (config: Config) {
    this._writeLogList = []
    if (config.loggerConfigMap) {
      const loggerConfigMap = config.loggerConfigMap
      Object.keys(loggerConfigMap).forEach(loggerKey => {
        const loggerConfig = loggerConfigMap[loggerKey]
        if (isNodeEnvironmentEnabled(loggerConfig)) {
          this.registerWriteLog(loggerConfig.writeLog)
        }
      })
    }
  }

  writeLog (level: Level, name: string, namespace: string, message: string, payload?: any, options?: Options) {
    this._writeLogList.forEach(writeLog => writeLog(level, name, namespace, message, payload, options))
  }

  registerWriteLog (writeLog: WriteLog) {
    this._writeLogList.push(writeLog)
    return () => { this._writeLogList = this._writeLogList.filter(_writeLog => _writeLog !== writeLog) }
  }
}

export const logManager = new LogManager()
