import env from '#start/env'

import { defineConfig, targets } from '@adonisjs/core/logger'

const loggerConfig = defineConfig({
  default: 'app',

  /**
   * The loggers object can be used to define multiple loggers.
   * By default, we configure only one logger (named "app").
   */
  loggers: {
    app: {
      enabled: true,
      name: env.get('APP_NAME'),
      level: env.get('LOG_LEVEL'),
      transport: {
        targets: targets()
          .push({
            target: 'pino-roll',
            level: 'info',
            options: {
              file: './logs/info/adonisjs.log',
              frequency: 'daily',
              mkdir: true,
            },
          })
          .toArray(),
      },
    },
    auth: {
      enabled: true,
      name: 'auth',
      level: env.get('LOG_LEVEL', 'info'),

      transport: {
        targets: targets()
          .push({
            target: 'pino-roll',
            level: 'info',
            options: {
              file: './logs/auth/adonisjs-requests.log',
              frequency: 'daily',
              mkdir: true,
            },
          })
          .toArray(),
      },
    },
    errors: {
      enabled: true,
      name: 'errors',
      level: 'error',
      transport: {
        targets: targets()
          .push({
            target: 'pino-roll',
            level: 'error', // Somente erros serão gravados aqui
            options: {
              file: './logs/errors/adonisjs-errors.log',
              frequency: 'daily',
              mkdir: true,
            },
          })
          .toArray(),
      },
    },
  },
})

export default loggerConfig

/**
 * Inferring types for the list of loggers you have configured
 * in your application.
 */
declare module '@adonisjs/core/types' {
  export interface LoggersList extends InferLoggers<typeof loggerConfig> {}
}
