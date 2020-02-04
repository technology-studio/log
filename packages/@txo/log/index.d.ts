declare module "@txo/log" {
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
