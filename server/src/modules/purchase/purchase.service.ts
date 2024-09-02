import { BadRequestException, Injectable } from '@nestjs/common';
import { PurchaseRepository } from './purchase.repository';
import { ProductService } from '../product/product.service';
import { Purchase, PurchaseStatus } from './purchase.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { getEndOfDay, getStartOfDay } from 'src/shared/utils/date';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly repository: PurchaseRepository,
    private readonly productService: ProductService,
    private readonly em: EntityManager,
  ) {}

  public async create(entity: Purchase) {
    await this.validateActivePurchase(entity.student.id);

    const products = await this.productService.findAllByStoreIdAndIdIn(
      entity.store.id,
      entity.products.getItems().map((pp) => pp.product.id),
    );

    if (products.length !== entity.products.getItems().length) {
      throw new Error('Um dos produtos enviados não existem.'); // an product does not exists
    }

    if (entity.id || entity.products.exists((item) => !!item.id)) {
      throw new Error('Existe um produto inválido!');
    }

    entity.status = PurchaseStatus.PENDING;

    const createdEntity = this.repository.create(entity);

    await this.em.transactional((tEm) => {
      return Promise.all([
        tEm.persistAndFlush(createdEntity),
        this.productService.updateQuantity(createdEntity, tEm),
      ]);
    });

    return await this.em.populate(createdEntity, ['store', 'products']);
  }

  public async cancel(purchaseId: number, cause: string) {
    if (!cause?.length || cause.length < 1) {
      throw new BadRequestException(
        'Motivo do cancelamento deve ser informado',
      );
    }
    return this.updateStatus(purchaseId, PurchaseStatus.REJECTED, cause);
  }

  public receive(purchaseId: number) {
    return this.updateStatus(purchaseId, PurchaseStatus.RECEIVED);
  }

  public async nextStatus(
    purchaseId: number,
    storeId: number,
    skipConfirm?: boolean,
  ) {
    const sequence = [
      PurchaseStatus.PENDING,
      PurchaseStatus.CONFIRMED,
      PurchaseStatus.STARTED,
      PurchaseStatus.FINISHED,
    ];

    const purchase = await this.repository.findOneOrFail({
      store: {
        id: storeId,
      },
      id: purchaseId,
    });

    let nextStatus =
      sequence[sequence.findIndex((status) => status === purchase.status) + 1];

    if (!nextStatus) throw new BadRequestException('Status não encontrado!');
    if (nextStatus === PurchaseStatus.CONFIRMED && skipConfirm) {
      nextStatus = PurchaseStatus.STARTED;
    }

    return this.updateStatus(purchaseId, nextStatus);
  }

  public findActiveByStudent(studentId: string) {
    if (!studentId) throw new Error('Informe o id do estudante!');

    const TwentyMinutesAgo = new Date();
    TwentyMinutesAgo.setMinutes(TwentyMinutesAgo.getMinutes() - 20);

    const FiveSecondsAgo = new Date();
    FiveSecondsAgo.setSeconds(TwentyMinutesAgo.getSeconds() - 5);

    return this.repository.findOne(
      {
        student: {
          id: studentId,
        },

        $or: [
          {
            status: {
              $nin: [PurchaseStatus.RECEIVED, PurchaseStatus.REJECTED],
            },
          },
          {
            cancelAt: {
              $gt: FiveSecondsAgo,
            },
          },
        ],
      },
      {
        populate: ['*'],
      },
    );
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
          $gte: getStartOfDay(),
          $lte: getEndOfDay(),
        },
      },
      populate: ['*'],
    });
  }

  public findByIdAndStoreId(id: number, storeId: number) {
    return this.repository.findOne(
      {
        id: id,
        store: {
          id: storeId,
        },
      },
      {
        populate: ['*'],
      },
    );
  }

  private async updateStatus(
    purchaseId: number,
    status: PurchaseStatus,
    cancelCause?: string,
  ) {
    const isRejected = status === PurchaseStatus.REJECTED;

    await this.repository.nativeUpdate(
      {
        id: purchaseId,
      },
      {
        status: status,
        cancelCause: isRejected ? cancelCause : null,
        cancelAt: isRejected ? new Date() : null,
      },
    );
  }

  private async validateActivePurchase(studentId: string) {
    const hasPending = await this.findActiveByStudent(studentId);
    if (hasPending) throw new Error('Usuário já possui um pedido em andamento');
  }
}
