/**
 * A simple logger interface for capturing log messages.
 */
export interface ILogger {
  info: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

/**
 * A basic logger implementation that prepends a log level and a timestamp.
 */
const logger: ILogger = {
  info: (...args: unknown[]): void => {
    console.log(`[INFO] [${new Date().toISOString()}]`, ...args);
  },
  error: (...args: unknown[]): void => {
    console.error(`[ERROR] [${new Date().toISOString()}]`, ...args);
  },
};

export default logger;
