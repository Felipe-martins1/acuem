import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/shared/controller/crud.controller';
import { Store } from './store.entity';
import { StoreDTO } from './dto';
import { StoreService } from './store.service';

@Controller('stores')
@ApiTags('stores')
export class StoreController extends CrudController<number, Store, StoreDTO>({
  swagger: {
    dtoType: StoreDTO,
    idType: StoreDTO.prototype.id,
  },
}) {
  constructor(private readonly service: StoreService) {
    super(service);
  }
}
