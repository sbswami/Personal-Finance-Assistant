/**
 * Logging
 * @module logging/index
 */

/**
 * @namespace logging
 */

/**
 * Requiring log4js
 * @const
 */
const log4js = require('log4js');

/**
 * Loading environment variables
 */
require('dotenv').config();


/**
 * Configure Log4JS
 * @name configure
 * @function
 * @inner
 * @param {String} filename - Object to 
 */
log4js.configure({
  /**
   * @typedef {Object} appenders -
   * @property {Object} logstash -
   * @property {Object} console -
   * @property {Object} file -
   */
  appenders: {

    /**
     * @typedef {Object} logstash -
     * @property {String} type - 
     * @property {String} url -
     * @property {String} application -
     * @property {String} logType -
     */
    logstash: {
      type: '@log4js-node/logstash-http',
      url: process.env.ELASTICSEARCH_URL,
      application: 'personal_finance_assistant',
      logType: 'application',
    },

    /**
     * @typedef {Object} console -
     * @property {String} type -
     * @property {Object} layout -
     */
    console: {
      type: 'stdout',

      /**
       * @typedef {Object} layout
       * @property {String} type -
       * @property {String} pattern -
       */
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS %p %c %m',
      }
    },
    /**
     * @typedef {Object} file -
     * @property {String} type -
     * @property {String} filename -
     * @property {Number} maxLogSize -
     * @property {Boolean} compress -
     */
    file: {
      type: 'file',
      filename: 'personal_finance_assistant.log',
      maxLogSize: 10485760,
      compress: true,
    },
  },
  /**
   * @typedef {Object} categories
   * @property {Object} default -
   */
  categories: {
    /**
     * @typedef {Object} default
     * @property {Array} appenders -
     * @property {string} level -
     */
    default: {
      appenders: ['file', 'logstash'],
      level: 'debug',
    },
  }
});

/**
 * @constant logger
 * @name log4js.getLogger
 * @function
 * @returns Logger
 */
const logger = log4js.getLogger();

/**
 * @exports logger
 */
module.exports = { logger };
