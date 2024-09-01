import { CrudEntity } from '../interface/crud-entity.interface';
import { Get, Param } from '@nestjs/common';
import { BaseDTO } from '../interface/base.dto';
import { CrudService } from '../service/crud.service';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

type Props = {
  swagger: {
    idType: any;
    dtoType: any;
  };
};

export function ReadOnlyController<
  const ID,
  const T extends CrudEntity<ID>,
  const DTO extends BaseDTO<T, DTO>,
>({ swagger }: Props): any {
  abstract class _ {
    constructor(
      private readonly service: CrudService<ID, T>,
      public readonly converter: BaseDTO<T, DTO>,
    ) {}

    @Get()
    @ApiResponse({
      isArray: true,
      type: swagger.dtoType,
    })
    async findAll(): Promise<DTO[]> {
      return (await this.service.findAll()).map((v) => this.converter.from(v));
    }

    @Get(':id')
    @ApiParam({
      name: 'id',
      type: swagger.idType,
    })
    @ApiResponse({
      schema: swagger.dtoType,
      type: swagger.dtoType,
    })
    async findOne(@Param('id') id: ID): Promise<DTO> {
      return this.converter.from(await this.service.findByIdOrThrow(id));
    }
  }

  return _;
}
