import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { Store } from './store.entity';

@Module({
  controllers: [StoreController],
  exports: [StoreService],
  imports: [MikroOrmModule.forFeature({ entities: [Store] })],
  providers: [StoreService],
})
export class StoreModule {}
