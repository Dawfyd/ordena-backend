import * as Joi from 'joi';

export default Joi.object({
  /* DATABASE INFORMATION */
  DATABASE_CLIENT: Joi.required(),
  DATABASE_HOST: Joi.required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USER: Joi.required(),
  DATABASE_PASSWORD: Joi.required(),
  DATABASE_NAME: Joi.required(),

  /* PORT APP */
  PORT: Joi.required(),

  /* BASIC ACL */
  BASIC_ACL_BASE_URL: Joi.required(),
  BASIC_ACL_COMPANY_UUID: Joi.required(),
  BASIC_ACL_ADMIN_EMAIL: Joi.required(),
  BASIC_ACL_ADMIN_PASSWORD: Joi.required(),
  BASIC_ACL_PROJECT_CODE: Joi.required(),

  /* CLOUDINARY */
  CLOUDINARY_CLOUD_NAME: Joi.required(),
  CLOUDINARY_API_KEY: Joi.required(),
  CLOUDINARY_API_SECRET: Joi.required()
});
