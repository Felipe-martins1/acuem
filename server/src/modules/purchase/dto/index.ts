import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PurchaseProductDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class PurchaseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty()
  @IsNotEmpty()
  storeId: number;

  @ApiProperty()
  products: PurchaseProductDTO[];
}
