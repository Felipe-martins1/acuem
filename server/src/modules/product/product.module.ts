import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Module({
  controllers: [ProductController],
  exports: [ProductService],
  imports: [MikroOrmModule.forFeature({ entities: [Product] })],
  providers: [ProductService],
})
export class ProductModule {}
