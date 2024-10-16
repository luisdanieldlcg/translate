import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { dbConfig } from '../db.config';
import { translationApiConfig } from './translation-api.config';
import jwtConfig from './jwt.config';

export default ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  load: [dbConfig, translationApiConfig, jwtConfig],
  validationSchema: Joi.object({
    API_SERVER_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_SA_USERNAME: Joi.string().required(),
    DB_SA_PASSWORD: Joi.string().required(),
    RAPID_API_KEY: Joi.string().required(),
    JWT_PRIVATE_KEY: Joi.string().required(),
    JWT_LIFETIME: Joi.number().required(),
  }),
});
