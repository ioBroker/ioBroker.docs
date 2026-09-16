export default class Logger {
    private readonly prefix: string;
    constructor(options?: { prefix?: string }) {
        options ||= {};
        this.prefix = options.prefix ? `${options.prefix}_` : '';
    }

    #write(severity: 'error' | ' warn' | ' info' | 'debug', text: string): void {
        if (severity === 'error') {
            console.error(`[error] ${text}`);
        } else if (severity === ' warn') {
            console.error(`[warn ] ${text}`);
        } else {
            console.log(`[${severity}]: ${text}`);
        }
    }

    log(text: string) {
        this.#write(' info', text);
    }
    warn(text: string) {
        this.#write(' warn', text);
    }
    error(text: string) {
        this.#write('error', text);
    }
    debug(text: string) {
        this.#write('debug', text);
    }
}
