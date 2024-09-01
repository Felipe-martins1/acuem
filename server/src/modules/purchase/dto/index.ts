import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { BaseDTO } from 'src/shared/interface/base.dto';
import { PurchaseProduct } from '../purchase-product.entity';
import { rel, wrap } from '@mikro-orm/core';
import { Product } from 'src/modules/product/product.entity';
import { Purchase, PurchaseStatus } from '../purchase.entity';
import { Store } from 'src/modules/store/store.entity';
import { Student } from 'src/modules/student/student.entity';

export class PurchaseProductDTO
  implements BaseDTO<PurchaseProduct, PurchaseProductDTO>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  purchaseId: number;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  productPrice: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;

  from(entity: PurchaseProduct): PurchaseProductDTO {
    const dto = new PurchaseProductDTO();

    dto.id = entity.id;
    dto.productName = entity.product.name;
    dto.productId = entity.product.id;
    dto.quantity = entity.quantity;
    dto.productPrice = entity.currentPrice;

    return dto;
  }

  to(dto: PurchaseProductDTO, existing?: PurchaseProduct): PurchaseProduct {
    const purchaseProduct = existing || new PurchaseProduct();

    purchaseProduct.product = rel(Product, dto.productId);
    purchaseProduct.purchase = rel(Purchase, dto.purchaseId);
    purchaseProduct.quantity = dto.quantity;

    return purchaseProduct;
  }
}

export class PurchaseDTO implements BaseDTO<Purchase, PurchaseDTO> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty()
  studentName: string;

  @ApiProperty()
  @IsNotEmpty()
  storeId: number;

  @ApiProperty()
  storeName: string;

  @ApiProperty()
  products: PurchaseProductDTO[];

  @ApiProperty()
  status: PurchaseStatus;

  @ApiProperty()
  cancelCause?: string;

  @ApiProperty()
  total: number;

  @ApiProperty()
  date: Date;

  from(entity: Purchase): PurchaseDTO {
    if (!entity) return null;
    const dto = new PurchaseDTO();

    dto.id = entity.id;
    dto.storeId = entity.store.id;
    dto.storeName = wrap(entity.store).toObject().name;
    dto.studentName = wrap(entity.student).toObject().name;
    dto.studentId = entity.student.id;

    dto.products = entity.products.map((prod) =>
      new PurchaseProductDTO().from(prod),
    );

    dto.date = entity.date;

    dto.status = entity.status;
    dto.cancelCause = entity.cancelCause;
    dto.total = entity.total;

    return dto;
  }

  to(dto: PurchaseDTO, existing?: Purchase): Purchase {
    const purchase = existing || new Purchase();
    purchase.store = rel(Store, dto.storeId);
    purchase.student = rel(Student, dto.studentId);
    dto.products.map((prod) => {
      const purchaseProd = new PurchaseProductDTO().to(prod);
      purchase.products.add(purchaseProd);
    });
    return purchase;
  }
}
