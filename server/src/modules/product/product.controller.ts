import { Controller, Get, Param, Query } from '@nestjs/common';
import { CrudController } from 'src/shared/controller/crud.controller';
import { Product } from './product.entity';
import { ProductDTO } from './dto';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CurrentEmployee,
  CurrentStudent,
  CurrentUser,
  GetCurrentUser,
} from 'src/shared/auth';

@ApiTags('products')
@Controller('products')
@ApiBearerAuth()
export class ProductController extends CrudController<
  number,
  Product,
  ProductDTO
>({
  swagger: {
    dtoType: ProductDTO,
    idType: String,
  },
}) {
  constructor(private readonly productService: ProductService) {
    super(productService, new ProductDTO());
  }

  @Get()
  @ApiResponse({
    isArray: true,
    type: ProductDTO,
  })
  async findAll(
    @GetCurrentUser() user: CurrentEmployee,
    @Query('categoryId') catId: number,
  ): Promise<ProductDTO[]> {
    return (
      await this.productService.findAll({
        where: {
          ...ProductService.FilterByStoreId(user.store.id),
          ...ProductService.FilterByCategory(catId),
        },
      })
    ).map((v) => new ProductDTO().from(v));
  }

  @Get('/store/:id')
  @ApiResponse({
    isArray: true,
    type: ProductDTO,
  })
  async findAllByStore(
    @CurrentStudent() _user: CurrentUser,
    @Param('id') storeId: number,
  ): Promise<ProductDTO[]> {
    return (
      await this.productService.findAll({
        where: {
          ...ProductService.FilterByStoreId(storeId),
          active: true,
          quantity: {
            $gt: 0,
          },
        },
      })
    ).map((v) => new ProductDTO().from(v));
  }
}
