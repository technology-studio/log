declare module "@txo-peer-dep/log" {
    import { 
        Level,
        WriteLog
     } from '@txo-peer-dep/log/Config'
    interface Options {
        important: boolean;
    }
    class Log {
        constructor(namespace: string, level?: Level);
        error (message: string, payload?: any, options?: Options): void;
        warning (message: string, payload?: any, options?: Options): void;
        info(message: string, payload?: any, options?: Options): void;
        debug (message: string, payload?: any, options?: Options): void;
        errorProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT;
        warningProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT;
        infoProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT
        debugProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT;
        errorLazy (message: string, payloadCallback: () => any, options?: Options): void;
        warningLazy (message: string, payloadCallback: () => any, options?: Options): void;
        infoLazy (message: string, payloadCallback: () => any, options?: Options): void;
        debugLazy (message: string, payloadCallback: () => any, options?: Options): void;
    }

}

declare module "@txo-peer-dep/log/Config" {
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
