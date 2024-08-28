import { BaseDTO } from 'src/shared/interface/base.dto';
import { ProductCategory } from '../product-category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProductCategoryDTO
  implements BaseDTO<ProductCategory, ProductCategoryDTO>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  to(dto: ProductCategoryDTO, existing?: ProductCategory): ProductCategory {
    const entity = existing || new ProductCategory();

    entity.name = dto.name;

    return entity;
  }

  from(entity: ProductCategory): ProductCategoryDTO {
    const dto = new ProductCategoryDTO();

    dto.name = entity.name;
    dto.id = entity.id;

    return dto;
  }
}
