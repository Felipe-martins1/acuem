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
  driver: PostgreSqlDriver,
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
  metadataProvider: ReflectMetadataProvider,
  dbName: 'acuem', // Nome do banco de dados
  password: 'admin', // Senha do banco de dados
  user: 'postgres', // Usuário do banco de dados
  // host: 'seuhost', // Host do banco de dados (Opcional Para banco de dados local, se utilizar o default)
  // port: 'suaporta', // Porta do banco de dados (Opcional Para banco de dados local, se utilizar a default)
});
