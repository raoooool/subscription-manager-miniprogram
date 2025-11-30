import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import type { Pool } from 'mysql2/promise';
import { createPool } from 'mysql2/promise';

import { DATABASE_POOL, DRIZZLE } from './database.constants';
import * as schema from './schema';
import databaseConfig from '../config/database.config';

export type Db = MySql2Database<typeof schema>;

@Global()
@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [
    {
      provide: DATABASE_POOL,
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService): Promise<Pool> => {
        const url = configService.get<string>('database.url');
        if (!url) {
          throw new Error('DATABASE_URL is not configured');
        }

        const pool = createPool(url);
        return pool;
      },
    },
    {
      provide: DRIZZLE,
      inject: [DATABASE_POOL],
      useFactory: (pool: Pool): Db =>
        drizzle(pool, {
          schema,
          mode: 'default',
        }),
    },
  ],
  exports: [DATABASE_POOL, DRIZZLE],
})
export class DatabaseModule {}
