/**
 * Centralized Error Logging System
 * Provides structured logging with context, error tracking, and debugging information
 */

const ERROR_CATEGORIES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  TYPE_ERROR: 'TYPE_ERROR',
  RANGE_ERROR: 'RANGE_ERROR',
  LOGICAL_ERROR: 'LOGICAL_ERROR',
  APPLICATION_ERROR: 'APPLICATION_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

const createLogEntry = (level, category, action, details = {}) => {
  return {
    level,
    category,
    action,
    timestamp: new Date().toISOString(),
    ...details
  };
};

export const logError = (action, error, context = {}) => {
  const category = context.category || ERROR_CATEGORIES.APPLICATION_ERROR;
  const logEntry = createLogEntry(LOG_LEVELS.ERROR, category, action, {
    error: {
      message: error?.message || String(error),
      stack: error?.stack,
      name: error?.name,
    },
    context: {
      ...context,
      userAgent: navigator.userAgent,
      url: window.location.href
    }
  });
  
  console.error(`[${category}] ${action}`, logEntry);
  return logEntry;
};

export const logWarning = (action, context = {}) => {
  const category = context.category || ERROR_CATEGORIES.APPLICATION_ERROR;
  const logEntry = createLogEntry(LOG_LEVELS.WARN, category, action, { context });
  console.warn(`[${category}] ${action}`, logEntry);
  return logEntry;
};

export const logInfo = (action, context = {}) => {
  const category = context.category || ERROR_CATEGORIES.APPLICATION_ERROR;
  const logEntry = createLogEntry(LOG_LEVELS.INFO, category, action, { context });
  console.log(`[${category}] ${action}`, logEntry);
  return logEntry;
};

export const logDebug = (action, context = {}) => {
  if (process.env.NODE_ENV === 'development') {
    const category = context.category || ERROR_CATEGORIES.APPLICATION_ERROR;
    const logEntry = createLogEntry(LOG_LEVELS.DEBUG, category, action, { context });
    console.debug(`[${category}] ${action}`, logEntry);
    return logEntry;
  }
};

export { ERROR_CATEGORIES, LOG_LEVELS };

