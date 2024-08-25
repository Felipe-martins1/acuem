import { Injectable } from '@nestjs/common';
import { PurchaseRepository } from './purchase.repository';
import { ProductService } from '../product/product.service';
import { Purchase, PurchaseStatus } from './purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly repository: PurchaseRepository,
    private readonly productService: ProductService,
  ) {}

  public async create(entity: Purchase) {
    const products = await this.productService.findAllByStoreIdAndIdIn(
      entity.store.id,
      entity.products.toArray().map((pp) => pp.product.id),
    );

    if (products.length !== entity.products.length) {
      throw new Error(); // an product does not exists
    }

    if (entity.id || entity.products.exists((item) => !!item.id)) {
      throw new Error();
    }

    entity.status = PurchaseStatus.PENDING;

    return this.repository.create(entity);
  }

  public accept(purchaseId: number) {
    this.updateStatus(purchaseId, PurchaseStatus.CONFIRMED);
  }

  public cancel(purchaseId: number, cause: string) {
    this.updateStatus(purchaseId, PurchaseStatus.REJECTED, cause);
  }

  public start(purchaseId: number) {
    this.updateStatus(purchaseId, PurchaseStatus.STARTED);
  }

  public finish(purchaseId: number) {
    this.updateStatus(purchaseId, PurchaseStatus.FINISHED);
  }

  public receive(purchaseId: number) {
    this.updateStatus(purchaseId, PurchaseStatus.RECEIVED);
  }

  public findAllByStudent(studentId: string) {
    return this.repository.findAll({
      where: {
        student: {
          id: studentId,
        },
      },
    });
  }

  public findAllByStore(storeId: number) {
    return this.repository.findAll({
      where: {
        store: {
          id: storeId,
        },
        date: {
          $gte: new Date(),
          $lte: new Date(),
        },
      },
    });
  }

  private updateStatus(
    purchaseId: number,
    status: PurchaseStatus,
    cancelCause?: string,
  ) {
    if (cancelCause && status !== PurchaseStatus.REJECTED) throw new Error();

    this.repository.nativeUpdate(
      {
        id: purchaseId,
      },
      {
        status: status,
      },
    );
  }
}
