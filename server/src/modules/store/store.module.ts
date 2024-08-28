import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { Store } from './store.entity';
import { Purchase } from '../purchase/purchase.entity';

@Module({
  controllers: [StoreController],
  exports: [StoreService],
  imports: [MikroOrmModule.forFeature({ entities: [Store, Purchase] })],
  providers: [StoreService],
})
export class StoreModule {}
