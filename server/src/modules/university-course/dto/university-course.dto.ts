import { BaseDTO } from 'src/shared/interface/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UniversityCourse } from '../university-course.entity';
import { wrap } from '@mikro-orm/core';

export class UniversityCourseDTO
  implements BaseDTO<UniversityCourse, UniversityCourseDTO>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  to(
    _dto: UniversityCourseDTO,
    _existing?: UniversityCourse,
  ): UniversityCourse {
    throw new Error('not implemented');
  }

  from(entity: UniversityCourse): UniversityCourseDTO {
    const dto = new UniversityCourseDTO();
    dto.id = entity.id;
    dto.name = wrap(entity.course).toObject().name;
    return dto;
  }
}
