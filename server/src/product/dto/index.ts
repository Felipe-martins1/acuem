import { BaseDTO } from 'src/shared/interface/base.dto';
import { Product } from '../product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from 'src/product-category/product-category.entity';
import { Store } from 'src/store/store.entity';

export class ProductDTO implements BaseDTO<Product, ProductDTO> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  storeId: number;

  to(existing?: Product): Product {
    const product = existing || new Product();

    product.name = this.name;
    product.description = this.description;
    product.price = this.price;
    product.quantity = this.quantity;

    product.category = ProductCategory.of(this.categoryId);
    product.store = Store.of(this.storeId);

    return product;
  }
  from(_entity: Product): ProductDTO {
    throw new Error('Method not implemented.');
  }
}
