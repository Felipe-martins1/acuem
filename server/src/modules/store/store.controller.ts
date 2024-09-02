import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/shared/controller/crud.controller';
import { Store } from './store.entity';
import { StoreDTO } from './dto';
import { StoreService } from './store.service';
import { CurrentEmployee } from 'src/shared/auth';

@Controller('stores')
@ApiTags('stores')
@ApiBearerAuth()
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
    @CurrentEmployee() user: CurrentEmployee,
  ) {
    console.log(user, id);
    if (user.store.id !== Number(id)) throw new Error();
    return this.service.findDashboard(user.store.id);
  }
}
