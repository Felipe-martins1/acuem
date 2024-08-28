import { BaseDTO } from 'src/shared/interface/base.dto';
import { Product } from '../product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from 'src/modules/product-category/product-category.entity';
import { rel } from '@mikro-orm/core';

export class ProductDTO implements BaseDTO<Product, ProductDTO> {
  @ApiProperty()
  id: number;

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

  @ApiProperty({ default: true })
  active: boolean;

  to(dto: ProductDTO, existing?: Product): Product {
    const product = existing || new Product();

    product.name = dto.name;
    product.description = dto.description;
    product.price = dto.price;
    product.quantity = dto.quantity;
    product.active = dto.active;

    product.category = rel(ProductCategory, dto.categoryId);

    return product;
  }
  from(entity: Product): ProductDTO {
    const dto = new ProductDTO();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.price = entity.price;
    dto.quantity = entity.quantity;
    dto.categoryId = entity.category.id;
    dto.active = entity.active;

    return dto;
  }
}
