import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/shared/controller/crud.controller';
import { Store } from './store.entity';
import { StoreDTO } from './dto';
import { StoreService } from './store.service';
import { CurrentEmployee, CurrentUser } from 'src/shared/auth';

@Controller('stores')
@ApiTags('stores')
export class StoreController extends CrudController<number, Store, StoreDTO>({
  swagger: {
    dtoType: StoreDTO,
    idType: StoreDTO.prototype.id,
  },
}) {
  constructor(private readonly service: StoreService) {
    super(service, new StoreDTO());
  }

  @Get(':id/dashboard')
  @ApiParam({
    name: 'id',
    type: Number,
  })
  async findDashboard(
    @Param('id') id: number,
    @CurrentUser() user: CurrentEmployee,
  ) {
    if (user.store.id !== Number(id)) throw new Error();
    return this.service.findDashboard(user.store.id);
  }
}
