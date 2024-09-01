import { BaseDTO } from 'src/shared/interface/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/modules/shared/embeddable/address';

export class AddressDTO implements BaseDTO<Address, AddressDTO> {
  @ApiProperty()
  street!: string;

  @ApiProperty()
  neighborhood!: string;

  @ApiProperty()
  complement!: string;

  @ApiProperty()
  number!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  state!: string;

  to(dto: AddressDTO, existing?: Address): Address {
    const address = existing || new Address();
    address.street = dto.street;
    address.neighborhood = dto.neighborhood;
    address.complement = dto.complement;
    address.number = dto.number;
    address.city = dto.city;
    address.state = dto.state;
    return address;
  }

  from(entity: Address): AddressDTO {
    const dto = new AddressDTO();
    dto.street = entity.street;
    dto.neighborhood = entity.neighborhood;
    dto.complement = entity.complement;
    dto.number = entity.number;
    dto.city = entity.city;
    dto.state = entity.state;
    return dto;
  }
}
