import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReadOnlyController } from 'src/shared/controller/readOnly.controller';
import { University } from './university.entity';
import { UniversityDTO } from './dto/university.dto';
import { UniversityService } from './university.service';

@Controller('universities')
@ApiTags('universities')
@ApiBearerAuth()
export class UniversityController extends ReadOnlyController<
  number,
  University,
  UniversityDTO
>({
  swagger: {
    dtoType: UniversityDTO,
    idType: UniversityDTO.prototype.id,
  },
}) {
  constructor(private readonly service: UniversityService) {
    super(service, new UniversityDTO());
  }
}
