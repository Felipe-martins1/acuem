import { Controller, Get, Query } from '@nestjs/common';
import { CrudController } from 'src/shared/controller/crud.controller';
import { Product } from './product.entity';
import { ProductDTO } from './dto';
import { ProductService } from './product.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/auth';

@ApiTags('products')
@Controller('products')
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
    @CurrentUser() user: any,
    @Query('categoryId') catId: number,
  ): Promise<ProductDTO[]> {
    return (
      await this.productService.findAll({
        where: {
          ...ProductService.FilterByStoreId(user.storeId),
          ...ProductService.FilterByCategory(catId),
        },
      })
    ).map((v) => new ProductDTO().from(v));
  }
}
