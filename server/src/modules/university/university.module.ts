import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { University } from './university.entity';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';

@Module({
  controllers: [UniversityController],
  exports: [UniversityService],
  imports: [MikroOrmModule.forFeature({ entities: [University] })],
  providers: [UniversityService],
})
export class UniversityModule {}
