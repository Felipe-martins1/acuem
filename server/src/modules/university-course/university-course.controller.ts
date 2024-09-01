import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReadOnlyController } from 'src/shared/controller/readOnly.controller';
import { UniversityCourse } from './university-course.entity';
import { UniversityCourseService } from './university-course.service';
import { UniversityCourseDTO } from './dto/university-course.dto';

@Controller('university-courses')
@ApiTags('university-courses')
@ApiBearerAuth()
export class UniversityCourseController extends ReadOnlyController<
  number,
  UniversityCourse,
  UniversityCourseDTO
>({
  swagger: {
    dtoType: UniversityCourseDTO,
    idType: UniversityCourseDTO.prototype.id,
  },
}) {
  constructor(private readonly service: UniversityCourseService) {
    super(service, new UniversityCourseDTO());
  }
}
