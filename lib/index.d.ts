declare module "@txo-peer-dep/log" {

    declare interface Options {
        important: boolean;
    };
    declare class Log {
        constructor(namespace: string, level?: Level);
        error (message: string, payload?: any, options?: Options);
        warning (message: string, payload?: any, options?: Options);
        info(message: string, payload?: any, options?: Options);
        debug (message: string, payload?: any, options?: Options);
        errorProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT;
        warningProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT;
        infoProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT
        debugProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT;
        errorLazy (message: string, payloadCallback: () => any, options?: Options);
        warningLazy (message: string, payloadCallback: () => any, options?: Options);
        infoLazy (message: string, payloadCallback: () => any, options?: Options);
        debugLazy (message: string, payloadCallback: () => any, options?: Options);
    }
}

declare module "@txo-peer-dep/log/Config" {
    import { ConfigManager } from '@txo/config-manager'
    declare interface LoggerConfig {
        writeLog: WriteLog;
        nodeEnvironmentList: string[];
    };

    declare interface LoggerConfigMap {
        [string]: LoggerConfig;
    };

    declare interface Config {
        loggerConfigMap?: LoggerConfigMap;
        defaultLevelForNodeEnvironmentMap?: {
            [string]: Level;
        };
        defaultLevelForUnknownNodeEnvironment: Level;
        levelOverride?: {
            level: Level;
            namespacePatternList: string[];
        };
        payloadProcessor: (payload?: any) => any;
    }
    declare var configManager: ConfigManager<Config>;
    declare enum levels {
        NONE = 0,
        ERROR = 1,
        WARNING = 2,
        INFO = 3,
        DEBUG = 4,
    };

    declare type Level = levels;
}
