import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductCategory } from './product-category.entity';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';

@Module({
  controllers: [ProductCategoryController],
  exports: [ProductCategoryService],
  imports: [MikroOrmModule.forFeature({ entities: [ProductCategory] })],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
