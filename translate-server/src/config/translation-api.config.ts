import { registerAs } from '@nestjs/config';

export const translationApiConfig = registerAs('translation', () => ({
  RAPID_API_HOST: process.env.RAPID_API_HOST,
  RAPID_API_KEY: process.env.RAPID_API_KEY,
}));
