import { BaseDTO } from 'src/shared/interface/base.dto';
import { Store } from '../store.entity';
import { ApiProperty } from '@nestjs/swagger';
import { rel } from '@mikro-orm/core';
import { University } from 'src/modules/university/university.entity';
import { AddressDTO } from 'src/shared/dto/address.dto';

export class StoreDTO implements BaseDTO<Store, StoreDTO> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  universityId: number;

  @ApiProperty()
  address: AddressDTO;

  to(dto: StoreDTO, existing?: Store): Store | Promise<Store> {
    const store = existing || new Store();
    store.university = rel(University, dto.universityId);
    store.name = dto.name;
    store.address = new AddressDTO().to(dto.address);
    store.cnpj = dto.cnpj;
    return store;
  }
  from(entity: Store): StoreDTO {
    const dto = new StoreDTO();
    dto.universityId = entity.university.id;
    dto.id = entity.id;
    dto.name = entity.name;
    dto.cnpj = entity.cnpj;
    dto.address = new AddressDTO().from(entity.address);
    return dto;
  }
}
