type LogLevel = 'log' | 'warn' | 'error' | 'silent';

const LOG_LEVEL = (import.meta.env.VITE_LOG_LEVEL as LogLevel) || 'log';

const logLevelsPriority: Record<LogLevel, number> = {
  log: 1,
  warn: 2,
  error: 3,
  silent: 4,
};

let currentLevel: LogLevel = LOG_LEVEL as LogLevel;

function shouldLog(level: LogLevel): boolean {
  return logLevelsPriority[level] >= logLevelsPriority[currentLevel];
}

export const logger = {
  setLevel: (level: LogLevel) => {
    currentLevel = level;
  },
  log: (...args: any[]) => {
    if (shouldLog('log')) console.log(...args);
  },
  warn: (...args: any[]) => {
    if (shouldLog('warn')) console.warn(...args);
  },
  error: (...args: any[]) => {
    if (shouldLog('error')) console.error(...args);
  },
  currentLevel: currentLevel,
};
