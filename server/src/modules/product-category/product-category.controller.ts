import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/shared/controller/crud.controller';
import { ProductCategory } from './product-category.entity';
import { ProductCategoryDTO } from './dto';
import { ProductCategoryService } from './product-category.service';
import { CurrentStudent, CurrentUser } from 'src/shared/auth';

@Controller('categories')
@ApiTags('categories')
export class ProductCategoryController extends CrudController<
  number,
  ProductCategory,
  ProductCategoryDTO
>({
  swagger: {
    dtoType: ProductCategoryDTO,
    idType: ProductCategoryDTO.prototype.id,
  },
}) {
  constructor(private readonly service: ProductCategoryService) {
    super(service, new ProductCategoryDTO());
  }

  @Get()
  @ApiResponse({
    isArray: true,
    type: ProductCategoryDTO,
  })
  async findAll(@CurrentUser() user: any): Promise<ProductCategoryDTO[]> {
    return (await this.service.findAllByStoreId(user.storeId)).map((v) =>
      new ProductCategoryDTO().from(v),
    );
  }

  @Get('/store/:id')
  @ApiResponse({
    isArray: true,
    type: ProductCategoryDTO,
  })
  async findAllByStore(
    @CurrentStudent() _user: any,
    @Param('id') storeId: number,
  ): Promise<ProductCategoryDTO[]> {
    return (await this.service.findAllByStoreId(storeId)).map((v) =>
      new ProductCategoryDTO().from(v),
    );
  }
}
