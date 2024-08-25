import { CrudEntity } from '../interface/crud-entity.interface';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BaseDTO } from '../interface/base.dto';
import { CrudService } from '../service/crud.service';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

type Props = {
  swagger: {
    idType: any;
    dtoType: any;
  };
};

export function CrudController<
  const ID,
  const T extends CrudEntity<ID>,
  const DTO extends BaseDTO<T, DTO>,
>({ swagger }: Props): any {
  abstract class _ {
    constructor(
      private readonly service: CrudService<ID, T>,
      private readonly converter: BaseDTO<T, DTO>,
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

    @Post()
    @ApiBody({
      type: swagger.dtoType,
    })
    @ApiResponse({
      content: swagger.dtoType,
    })
    async create(@Body() dto: DTO): Promise<DTO> {
      return this.converter.from(
        await this.service.create(await this.converter.to(dto)),
      );
    }

    @Put(':id')
    @ApiParam({
      name: 'id',
      type: swagger.idType,
    })
    @ApiBody({
      type: swagger.dtoType,
    })
    @ApiResponse({
      content: swagger.dtoType,
    })
    async update(@Param('id') id: ID, @Body() dto: DTO): Promise<DTO> {
      const entity = await this.service.findByIdOrThrow(id);
      const entityToSave = await this.converter.to(dto, entity);
      entityToSave.id = id;
      return this.converter.from(await this.service.update(entityToSave));
    }

    @Delete(':id')
    @ApiParam({
      name: 'id',
      type: swagger.idType,
    })
    async delete(@Param('id') id: ID): Promise<void> {
      return this.service.delete(id);
    }
  }

  return _;
}
