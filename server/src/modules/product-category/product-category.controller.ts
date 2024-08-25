import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from 'src/shared/controller/crud.controller';
import { ProductCategory } from './product-category.entity';
import { ProductCategoryDTO } from './dto';
import { ProductCategoryService } from './product-category.service';

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
}
