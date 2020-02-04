declare module "@txo-peer-dep/log" {
    import { 
        Level,
        WriteLog
     } from '@txo-peer-dep/log/Config'
    interface Options {
        important: boolean;
    }

    import { ConfigManager } from '@txo/config-manager'
    interface LoggerConfig {
        writeLog: WriteLog;
        nodeEnvironmentList: string[];
    }

    interface LoggerConfigMap {
        [key: string]: LoggerConfig;
    }

    interface Config {
        loggerConfigMap?: LoggerConfigMap;
        defaultLevelForNodeEnvironmentMap?: {
            [key: string]: Level;
        };
        defaultLevelForUnknownNodeEnvironment: Level;
        levelOverride?: {
            level: Level;
            namespacePatternList: string[];
        };
        payloadProcessor: (payload?: any) => any;
    }
    var configManager: ConfigManager<Config>;
    enum levels {
        NONE = 0,
        ERROR = 1,
        WARNING = 2,
        INFO = 3,
        DEBUG = 4,
    }

    type Level = levels;
    type Options = {
        important: boolean,
      }
    type WriteLog = (level: Level, name: string, namespace: string, message: string, payload?: any, options?: Options) => void
}
