import config from 'config';
import winston from 'winston';

const devMode = config.get('dev_mode');
const rotationLimit: number = config.get('logger.rotationLimit');

const developmentLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service-development' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
      maxsize: rotationLimit
    }),
    new winston.transports.File({
      filename: './logs/combined.log',
      maxsize: rotationLimit
    })
  ]
});

const productionLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
      maxsize: rotationLimit
    }),
    new winston.transports.File({
      filename: './logs/combined.log',
      maxsize: rotationLimit
    })
  ]
});

export default devMode ? developmentLogger : productionLogger;
