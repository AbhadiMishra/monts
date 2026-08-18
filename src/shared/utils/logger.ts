import { env } from '../../config/env';

/**
 * Pluggable Logger Utility
 * Logs structured error messages in development.
 * Pluggable for Sentry/LogRocket in production.
 */
export const logger = {
  logError: (error: Error | unknown, context?: string) => {
    if (env.isDev) {
      console.error(`[MONTS Error Boundary${context ? ` - ${context}` : ''}]:`, error);
    } else {
      // Production logger hook (e.g. Sentry.captureException(error))
      console.error('[Production Error]:', error);
    }
  },
  logInfo: (message: string, data?: unknown) => {
    if (env.isDev) {
      console.log(`[MONTS Info]: ${message}`, data || '');
    }
  },
};
