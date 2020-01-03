/**
 * Socket Manager
 * @module socketManager/index
 */

/**
 * @namespace socketManager
 */

/**
 * Requiring Logger
 * @constant
 */
const { logger } = require('../logging/index');

/**
 * @exports
 * @name SocketManager
 * @function
 * @memberof module:socketManager/index~socketManager
 * @inner
 * @param {any} socket - Socket 
 */
module.exports.SocketManager = socket => {
  /**
   * Listener for user-track Event
   * @name on
   * @function
   * @inner
   * @param {String} Event - Event listener
   * @param {Callback} Function - Callback with Payload
   */
  socket.on('user-track', (payload) => {
    logger.addContext('screen', payload.screen);
    logger.addContext('browser', payload.browser);
    logger.addContext('country', payload.country);
    logger.addContext('geo', payload.geo);
    logger.addContext('os', payload.os);
    logger.addContext('timeSpent', payload.timeSpent)
    logger.addContext('userId', payload.userId);
    logger.addContext('fullName', payload.fullName);
    logger.addContext('dob', payload.dob);
    logger.addContext('phone', payload.phone);
    logger.addContext('email', payload.email);
    logger.addContext('businessName', payload.businessName);
    logger.info('User info!');
  });
}
