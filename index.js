const Joi = require('joi');
const pino = require('pino');
const pretty = require('pino-pretty');
const Package = require('./package');

/* Validate query builder options with given schema */
const schema = {
  optionsSchema: Joi.object({
    defaultLimit: Joi.number().integer().default(50),
  }),
};

const _logger = () => {
  const stream = pretty({
    colorize: true,
  });
  return pino(stream);
};

/* Export query builder package name */
exports.name = Package.name;

/* Export query builder package version */
exports.version = Package.version;

/* Register hapi query builder plugin */
exports.register = (server, options) => {
  const validateOptions = schema.optionsSchema.validate(options);
  if (validateOptions.error) {
    throw new Error(validateOptions.error);
  }

  /**
   * Query builder trigger on only get method otherwise its skip automatically
   * @param {Hapi request obj} request request object
   * @param {hapi handler} h response object
   * @return {where, options} in parsedQuery
   */
  server.ext('onPostStart', async function (server) {
    const logger = _logger();
    logger.error(new Error('custom error'), 'got in');
  });

  server.events.on('log', function (event) {
    console.log('texttttttt');
  });
};
