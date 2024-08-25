import { BaseDTO } from 'src/shared/interface/base.dto';
import { Store } from '../store.entity';
import { ApiProperty } from '@nestjs/swagger';

export class StoreDTO implements BaseDTO<Store, StoreDTO> {
  @ApiProperty()
  id: number;

  to(_dto: StoreDTO, _existing?: Store): Store | Promise<Store> {
    throw new Error('Method not implemented.');
  }
  from(_entity: Store): StoreDTO {
    throw new Error('Method not implemented.');
  }
}
