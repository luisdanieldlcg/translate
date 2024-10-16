import { registerAs } from '@nestjs/config';

export const translationApiConfig = registerAs('translation', () => ({
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
}));
