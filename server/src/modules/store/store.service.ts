import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/shared/service/crud.service';
import { Store } from './store.entity';
import { StoreRepository } from './store.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { PurchaseRepository } from '../purchase/purchase.repository';
import {
  getEndOfDay,
  getMonthDateRange,
  getStartOfDay,
} from 'src/shared/utils/date';

@Injectable()
export class StoreService extends CrudService<number, Store> {
  constructor(
    protected readonly repository: StoreRepository,
    protected readonly pedidosRepository: PurchaseRepository,
    protected readonly em: EntityManager,
  ) {
    super(repository, em);
  }

  async findDashboard(storeId: number) {
    const purchasesDay = await this.pedidosRepository.findAll({
      where: {
        store: {
          id: storeId,
        },
        date: {
          $gte: getStartOfDay(),
          $lte: getEndOfDay(),
        },
      },
    });

    const { start, end } = getMonthDateRange(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
    );

    const purchasesMonth = await this.pedidosRepository.findAll({
      where: {
        store: {
          id: storeId,
        },
        date: {
          $gte: start,
          $lte: end,
        },
      },
    });

    console.log(purchasesDay, purchasesMonth);

    return {
      purchasesDay,
      purchasesMonth,
    };
  }

  beforeCreate(_entity: Store): Promise<void> | void {}
  beforeUpdate(_entity: Store): Promise<void> | void {}
}
