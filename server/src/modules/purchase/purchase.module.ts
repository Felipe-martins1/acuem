import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Purchase } from '../purchase/purchase.entity';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { PurchaseProduct } from './purchase-product.entity';
import { ProductModule } from '../product/product.module';

@Module({
  controllers: [PurchaseController],
  exports: [PurchaseService],
  imports: [
    MikroOrmModule.forFeature({ entities: [Purchase, PurchaseProduct] }),
    ProductModule,
  ],
  providers: [PurchaseService],
})
export class PurchaseModule {}
