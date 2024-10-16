import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { dbConfig } from '../db.config';
import { translationApiConfig } from './translation-api.config';

export default ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  load: [dbConfig, translationApiConfig],
  validationSchema: Joi.object({
    API_SERVER_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_SA_USERNAME: Joi.string().required(),
    DB_SA_PASSWORD: Joi.string().required(),
    GOOGLE_API_KEY: Joi.string().required(),
  }),
});
