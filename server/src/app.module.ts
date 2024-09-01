import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/postgresql';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';

import MikroOrmConfig from './mikro-orm.config';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { StoreModule } from './modules/store/store.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { AuthMiddleware } from './shared/auth';
import { ProductController } from './modules/product/product.controller';
import { ProductCategoryController } from './modules/product-category/product-category.controller';
import { StoreController } from './modules/store/store.controller';
import { PurchaseController } from './modules/purchase/purchase.controller';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './modules/user/user.controller';

@Module({
  imports: [
    MikroOrmModule.forRoot(MikroOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ProductModule,
    ProductCategoryModule,
    StoreModule,
    PurchaseModule,
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
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: 'users/login',
        method: RequestMethod.POST,
      })
      .forRoutes(
        UserController,
        ProductController,
        ProductCategoryController,
        StoreController,
        PurchaseController,
      );
  }
}
