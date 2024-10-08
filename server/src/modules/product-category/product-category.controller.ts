import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/shared/controller/crud.controller';
import { ProductCategory } from './product-category.entity';
import { ProductCategoryDTO } from './dto';
import { ProductCategoryService } from './product-category.service';
import {
  CurrentEmployee,
  CurrentStudent,
  CurrentUser,
  GetCurrentUser,
} from 'src/shared/auth';

@Controller('categories')
@ApiTags('categories')
@ApiBearerAuth()
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
  async findAll(
    @GetCurrentUser() user: CurrentEmployee,
  ): Promise<ProductCategoryDTO[]> {
    return (await this.service.findAllByStoreId(user.store.id)).map((v) =>
      new ProductCategoryDTO().from(v),
    );
  }

  @Get('/store/:id')
  @ApiResponse({
    isArray: true,
    type: ProductCategoryDTO,
  })
  async findAllByStore(
    @CurrentStudent() _user: CurrentUser,
    @Param('id') storeId: number,
  ): Promise<ProductCategoryDTO[]> {
    return (await this.service.findAllByStoreId(storeId)).map((v) =>
      new ProductCategoryDTO().from(v),
    );
  }
}
