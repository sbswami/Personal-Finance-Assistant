/** Mongoose Configuration
 * @module connection/mongoose
 */

/**
 * @namespace mongooseConfiguration
 */

/**
 * Requiring Mongoose
 * @const {mongoose}
 */
const mongoose = require("mongoose");

/**
 * @typedef {Object} options
 * @property {Boolean} useNewUrlParser To parser MongoDB connection strings
 * @property {Boolean} useCreateIndex Ask MongoDB to be able to identify unique fields
 * @property {Boolean} useFindAndModify New Mongoose option to be able to use findById() etc.
 * @property {Boolean} autoIndex Disbale as index creation can cause a significant performance impact
 * @property {Number} reconnectTries Defines number of tries to try reconnecting to MongoDB
 * @property {Number} reconnectInterval MongoDB driver will try to reconnect every reconnectInterval milliseconds for reconnectTries
 * @property {Number} poolSize The maximum number of sockets the MongoDB driver will keep open for this connection
 */

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false,
  reconnectTries: 20,
  reconnectInterval: 500,
  poolSize: 10,
};


/**
 * Opening Mongoose Connection
 * @name connect
 * @function
 * @memberof module:connection/mongoose~mongooseConfiguration
 * @inner
 * @param {String} mongoURI - MongoDB Connection URL
 * @param {object} connectionOptions - MongoDB Connection Options
 */
mongoose.connect(process.env.mongoURI, options);

/**
 * Connected Handler
 * @name connected
 * @function
 * @memberof module:connection/mongoose~mongooseConfiguration
 * @inner
 * @param {String} connected - Connection Event
 * @param {callback} function - Executed After Event Occur
 */
mongoose.connection.on('connected', () => {
  console.info('MongoDB Connected Successfully!!');
});

/**
 * Error Handler
 * @name error
 * @function
 * @memberof module:connection/mongoose~mongooseConfiguration
 * @inner
 * @param {String} error - Connection Event
 * @param {callback} function - Executes on error in connection
 */
mongoose.connection.on('error', err => {
  console.error(`Error in mongoose Connection: ${err}`);
});

/**
 * Disconnected Handler
 * @name disconnected
 * @function
 * @memberof module:connection/mongoose~mongooseConfiguration
 * @inner
 * @param {String} diconnected - Connection Event
 * @param {callback} function - Executes after disconnected
 */
mongoose.connection.on("disconnected", () => {
  console.log('Mongoose Connection is Disconnected');
});

/**
 * Unexpected Shutdown Handler
 * @name SIGINT
 * @function
 * @memberof  module:connection/mongoose~mongooseConfiguration
 * @inner
 * @param {String} SIGINT - Connection Event
 * @param {callback} function - To be executed after unexpected shutdown of db server
 */
process.on('SIGINT', function() {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
