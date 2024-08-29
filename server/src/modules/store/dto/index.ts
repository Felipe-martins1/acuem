import { BaseDTO } from 'src/shared/interface/base.dto';
import { Store } from '../store.entity';
import { ApiProperty } from '@nestjs/swagger';
import { rel } from '@mikro-orm/core';
import { University } from 'src/modules/university/university.entity';

export class StoreDTO implements BaseDTO<Store, StoreDTO> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  universityId: number;

  to(dto: StoreDTO, existing?: Store): Store | Promise<Store> {
    const store = existing || new Store();
    store.university = rel(University, dto.universityId);
    store.name = dto.name;
    return store;
  }
  from(entity: Store): StoreDTO {
    const dto = new StoreDTO();
    dto.universityId = entity.university.id;
    dto.id = entity.id;
    dto.name = entity.name;
    dto.cnpj = entity.cnpj;
    return dto;
  }
}
