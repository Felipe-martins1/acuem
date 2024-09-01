import {
  defineConfig,
  ReflectMetadataProvider,
  Utils,
} from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export default defineConfig({
  entities: ['dist/modules/**/*.entity.js'],
  entitiesTs: ['src/modules/**/*.entity.ts'],
  dbName: 'acuem',
  driver: PostgreSqlDriver,
  password: 'admin',
  user: 'postgres',
  extensions: [SeedManager, Migrator],
  migrations: {
    path: process.cwd() + '/dist/database/migrations',
    pathTs: process.cwd() + '/src/database/migrations',
  },
  seeder: {
    path: Utils.detectTsNode()
      ? './src/database/seeders'
      : './dist/database/seeders',
  },
  debug: true,
  metadataProvider: ReflectMetadataProvider,
});
