/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2017-11-29T10:31:51+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import {
  configManager,
  isNodeEnvironmentEnabled,
} from './Api/Config'
import { logManager } from './Api/LogManager'
import {
  suppressFreezing,
  CYCLIC_ARRAY,
  CYCLIC_OBJECT,
} from './Api/Utils'
import {
  type Level,
  type Options,
  type WriteLog,
  levels,
} from './Model/Types'

export {
  configManager,
  CYCLIC_ARRAY,
  CYCLIC_OBJECT,
  isNodeEnvironmentEnabled,
  levels,
  logManager,
  suppressFreezing,
}

export type {
  Level,
  Options,
  WriteLog,
}
