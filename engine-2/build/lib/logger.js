"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    prefix;
    constructor(options) {
        options ||= {};
        this.prefix = options.prefix ? `${options.prefix}_` : '';
    }
    #write(severity, text) {
        if (severity === 'error') {
            console.error(`[error] ${text}`);
        }
        else if (severity === ' warn') {
            console.error(`[warn ] ${text}`);
        }
        else {
            console.log(`[${severity}]: ${text}`);
        }
    }
    log(text) {
        this.#write(' info', text);
    }
    warn(text) {
        this.#write(' warn', text);
    }
    error(text) {
        this.#write('error', text);
    }
    debug(text) {
        this.#write('debug', text);
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map