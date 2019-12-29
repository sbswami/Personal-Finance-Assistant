const log4js = require('log4js');

require('dotenv').config();
log4js.configure({
  appenders: {
    logstash: {
      type: '@log4js-node/logstash-http',
      url: process.env.ELASTICSEARCH_URL,
      application: 'personal_finance_assistant',
      logType: 'application',
    },
    console: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS %p %c %m',
      }
    },
    file: {
      type: 'file',
      filename: 'personal_finance_assistant.log',
      maxLogSize: 10485760,
      compress: true,
    },
  },
  categories: {
    default: { appenders: ['file', 'logstash'], level: 'debug' },
  }
});

const logger = log4js.getLogger();
module.exports = { logger };
