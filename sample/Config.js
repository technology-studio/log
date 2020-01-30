/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-11-12T15:41:36+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import {
  configManager,
  levels,
  type WriteLog,
} from '../packages/@txo-peer-dep/log/src/Config'

const sampleWriteLog: WriteLog = (level, name, namespace, message, payload, options) => {
  console.log(level, name, namespace, message, payload)
}

configManager.update({
  loggerConfigMap: {
    sampleLogger: {
      writeLog: sampleWriteLog,
      nodeEnvironmentList: ['production', 'development'],
    },
  },
  defaultLevelForUnknownNodeEnvironment: levels.NONE, // optional, configuration default
  defaultLevelForNodeEnvironmentMap: {
    production: levels.ERROR,
    development: levels.INFO,
  },
  levelOverride: {
    level: levels.DEBUG,
    namespacePatternList: [
      'namespace.namespace', // given pattern is compared as prefix, overrides logs with given prefix
      'namespace.namespace.namespace.Sample', // in this case, exact match
    ],
  },
})
