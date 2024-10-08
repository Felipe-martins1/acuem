import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PurchaseService } from './purchase.service';
import { PurchaseDTO } from './dto';
import {
  CurrentEmployee,
  CurrentStudent,
  CurrentUser,
  GetCurrentEmployee,
  GetCurrentUser,
} from 'src/shared/auth';
@Controller('purchases')
@ApiTags('purchases')
@ApiBearerAuth()
export class PurchaseController {
  converter: PurchaseDTO = new PurchaseDTO();
  constructor(private readonly service: PurchaseService) {}

  @Post()
  async create(@Body() dto: PurchaseDTO, @CurrentStudent() user: CurrentUser) {
    dto.studentId = user.id;
    return this.converter.from(
      await this.service.create(this.converter.to(dto)),
    );
  }

  @Get('student/active')
  async findActiveByUser(@CurrentStudent() user: CurrentUser) {
    return this.converter.from(await this.service.findActiveByStudent(user.id));
  }

  @Post('student/receive')
  async confirmReceive(@CurrentStudent() user: CurrentUser) {
    const activePurchase = await this.service.findActiveByStudent(user.id);
    if (!activePurchase) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return this.service.receive(activePurchase.id).then(() => true);
  }

  @Get('store')
  async findAllByStore(@GetCurrentUser() user: CurrentEmployee) {
    const purchases = await this.service.findAllByStore(user.store.id);

    return purchases.map((purchase) => this.converter.from(purchase));
  }

  @Post(':id/status/next')
  async nextStatus(
    @GetCurrentUser() user: CurrentEmployee,
    @Param('id') id: number,
    @Body('skipConfirm') skipConfirm?: boolean,
  ) {
    return this.service
      .nextStatus(id, user.store.id, skipConfirm)
      .then(() => true);
  }

  @Post(':id/cancel')
  async cancel(
    @GetCurrentEmployee() user: CurrentEmployee,
    @Param('id') id: number,
    @Body('reason') reason: string,
  ) {
    const purchase = await this.service.findByIdAndStoreId(id, user.store.id);

    if (!purchase) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return this.service.cancel(id, reason).then(() => true);
  }
}
