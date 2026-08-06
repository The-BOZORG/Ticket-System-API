import * as Joi from 'joi';

export default Joi.object({
  DATABASE_PORT: Joi.number().port().default(5432),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  JWT_ACCESS_TOKEN: Joi.string().required(),
  JWT_REFRESH_TOKEN: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
  JWT_REFRESH_TOKEN_TTL: Joi.number().required(),
});
