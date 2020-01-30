/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-22T19:55:58+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import { configManager } from '../Config'
import type { Level } from '../Model/Types'

const breakableReduce = <ACCUMULATOR, VALUE> (
  array: VALUE[],
  callback: (accumulator?: ACCUMULATOR, value: VALUE) => { break: boolean, accumulator?: ACCUMULATOR },
  initial?: ACCUMULATOR,
): ?ACCUMULATOR => {
  var current = {
    break: false,
    accumulator: initial,
  }
  for (var index = 0; index < array.length && !current.break; ++index) {
    current = callback(current.accumulator, array[index])
  }
  return current.accumulator
}

export const getLevelOverride = (namespace: string): ?Level => {
  const levelOverride = configManager.config.levelOverride

  return levelOverride && breakableReduce(levelOverride.namespacePatternList, (level, namespacePattern) => {
    return namespace.startsWith(namespacePattern)
      ? { break: true, accumulator: levelOverride.level }
      : { break: false }
  })
}
