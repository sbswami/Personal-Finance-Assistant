const { logger } = require('../logging/index');

module.exports.SocketManager = socket => {
  console.log('Hureee!');
  socket.on('user-track', (payload) => {
    console.log(payload);
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
