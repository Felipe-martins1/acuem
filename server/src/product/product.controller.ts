import { Controller } from '@nestjs/common';
import { CrudController } from 'src/shared/controller/crud.controller';
import { Product } from './product.entity';
import { ProductDTO } from './dto';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController extends CrudController<
  number,
  Product,
  ProductDTO
>({
  swaggerTypes: {
    dtoType: ProductDTO,
    idType: String,
  },
}) {
  constructor(private readonly productService: ProductService) {
    super(productService);
  }
}
