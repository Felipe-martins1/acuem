import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/postgresql';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';

import MikroOrmConfig from './mikro-orm.config';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(MikroOrmConfig),
    UserModule,
    ProductModule,
    ProductCategoryModule,
    StoreModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
