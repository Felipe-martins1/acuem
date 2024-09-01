import { BaseDTO } from 'src/shared/interface/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { University } from 'src/modules/university/university.entity';

export class UniversityDTO implements BaseDTO<University, UniversityDTO> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  to(_dto: UniversityDTO, _existing?: University): University {
    throw new Error('not implemented');
  }

  from(entity: University): UniversityDTO {
    const dto = new UniversityDTO();
    dto.id = entity.id;
    dto.name = entity.name;
    return dto;
  }
}
