import { ConfigType, registerAs } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const dbConfig = registerAs('database', () => ({
  DB_PORT: parseInt(process.env.DB_PORT),
  DB_HOST: process.env.DB_HOST,
  DB_SA_USERNAME: process.env.DB_SA_USERNAME,
  DB_SA_PASSWORD: process.env.DB_SA_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_LOGS: process.env.DB_LOGS,
}));

export const DatabaseModule = TypeOrmModule.forRootAsync({
  useFactory: async (config: ConfigType<typeof dbConfig>) => {
    return {
      type: 'postgres',
      username: config.DB_SA_USERNAME,
      password: config.DB_SA_PASSWORD,
      host: config.DB_HOST,
      port: config.DB_PORT,
      database: config.DB_NAME,
      // synchronize: true,
      // entities: [__dirname + '/../**/*.entity.{js,ts}'],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      options: { trustServerCertificate: true },
      // autoLoadEntities: true,
    };
  },
  inject: [dbConfig.KEY],
});
