/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-16T11:09:57+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import {
  getDefaultLevel,
  configManager,
} from '../Config'

import { logManager } from './LogManager'
import {
  type Options,
  type Level,
  levels,
} from '../Model/Types'
import { getLevelOverride } from './LevelHelper'

export class Log {
  static levels = levels
  ownLevel: ?Level
  level: Level
  name: string
  namespace: string

  constructor (namespace: string, level?: Level) {
    this.name = namespace.substr(namespace.lastIndexOf('.') + 1)
    this.namespace = namespace
    this.ownLevel = level
    this.syncFromConfig()
    configManager.subscribe(this.onConfigChange)
  }

  onConfigChange = () => {
    this.syncFromConfig()
  }

  syncFromConfig () {
    this.level = getLevelOverride(this.namespace) || this.ownLevel || getDefaultLevel()
  }

  error (message: string, payload?: any, options?: Options) {
    this.level >= levels.ERROR && this._write(levels.ERROR, message, payload, options)
  }

  warning (message: string, payload?: any, options?: Options) {
    this.level >= levels.WARNING && this._write(levels.WARNING, message, payload, options)
  }

  info (message: string, payload?: any, options?: Options) {
    this.level >= levels.INFO && this._write(levels.INFO, message, payload, options)
  }

  debug (message: string, payload?: any, options?: Options) {
    this.level >= levels.DEBUG && this._write(levels.DEBUG, message, payload, options)
  }

  errorProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT {
    this.level >= levels.ERROR && this._write(levels.ERROR, message, result, options)
    return result
  }

  warningProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT {
    this.level >= levels.WARNING && this._write(levels.WARNING, message, result, options)
    return result
  }

  infoProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT {
    this.level >= levels.INFO && this._write(levels.INFO, message, result, options)
    return result
  }

  debugProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT {
    this.level >= levels.DEBUG && this._write(levels.DEBUG, message, result, options)
    return result
  }

  errorLazy (message: string, payloadCallback: () => any, options?: Options) {
    this.level >= levels.ERROR && this._write(levels.ERROR, message, payloadCallback(), options)
  }

  warningLazy (message: string, payloadCallback: () => any, options?: Options) {
    this.level >= levels.WARNING && this._write(levels.WARNING, message, payloadCallback(), options)
  }

  infoLazy (message: string, payloadCallback: () => any, options?: Options) {
    this.level >= levels.INFO && this._write(levels.INFO, message, payloadCallback(), options)
  }

  debugLazy (message: string, payloadCallback: () => any, options?: Options) {
    this.level >= levels.DEBUG && this._write(levels.DEBUG, message, payloadCallback(), options)
  }

  _write (level: Level, message: string, payload?: any, options?: Options) {
    logManager.writeLog(level, this.name, this.namespace, message, payload, options)
  }
}
