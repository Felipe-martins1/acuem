import { BaseDTO } from 'src/shared/interface/base.dto';
import { ProductCategory } from '../product-category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { rel } from '@mikro-orm/core';
import { Store } from 'src/modules/store/store.entity';

export class ProductCategoryDTO
  implements BaseDTO<ProductCategory, ProductCategoryDTO>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  storeId: number;

  to(dto: ProductCategoryDTO, existing?: ProductCategory): ProductCategory {
    const entity = existing || new ProductCategory();

    entity.name = dto.name;
    entity.store = rel(Store, dto.storeId);

    return entity;
  }

  from(entity: ProductCategory): ProductCategoryDTO {
    const dto = new ProductCategoryDTO();

    dto.name = entity.name;
    dto.id = entity.id;
    dto.storeId = entity.store.id;

    return dto;
  }
}
