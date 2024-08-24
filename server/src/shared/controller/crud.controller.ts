import { CrudEntity } from '../interface/crud-entity.interface';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BaseDTO } from '../interface/base.dto';
import { CrudService } from '../service/crud.service';
import { ApiBody, ApiParam } from '@nestjs/swagger';

type Props = {
  swaggerTypes: {
    idType: any;
    dtoType: any;
  };
};

export function CrudController<
  const ID,
  const T extends CrudEntity<ID>,
  const DTO extends BaseDTO<T, DTO>,
>({ swaggerTypes }: Props): any {
  abstract class _ {
    constructor(private readonly service: CrudService<ID, T>) {}

    @Get()
    async findAll(): Promise<T[]> {
      return await this.service.findAll();
    }

    @Get(':id')
    @ApiParam({
      name: 'id',
      type: swaggerTypes.idType,
    })
    async findOne(@Param('id') id: ID): Promise<T> {
      return this.service.findByIdOrThrow(id);
    }

    @Post()
    @ApiBody({
      type: swaggerTypes.dtoType,
    })
    async create(@Body() dto: DTO): Promise<T> {
      return this.service.create(dto.to());
    }

    @Put(':id')
    @ApiParam({
      name: 'id',
      type: swaggerTypes.idType,
    })
    @ApiBody({
      type: swaggerTypes.dtoType,
    })
    async update(@Param('id') id: ID, @Body() dto: DTO): Promise<T> {
      const entity = await this.service.findByIdOrThrow(id);
      const entityToSave = dto.to(entity);
      entityToSave.id = id;
      return this.service.update(entityToSave);
    }

    @Delete(':id')
    @ApiParam({
      name: 'id',
      type: swaggerTypes.idType,
    })
    async delete(@Param('id') id: ID): Promise<void> {
      return this.service.delete(id);
    }
  }

  return _;
}
