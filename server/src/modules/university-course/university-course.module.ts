import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UniversityCourse } from './university-course.entity';
import { UniversityCourseController } from './university-course.controller';
import { UniversityCourseService } from './university-course.service';

@Module({
  controllers: [UniversityCourseController],
  exports: [UniversityCourseService],
  imports: [MikroOrmModule.forFeature({ entities: [UniversityCourse] })],
  providers: [UniversityCourseService],
})
export class UniversityCourseModule {}
