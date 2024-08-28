import { FindAllOptions } from '@mikro-orm/core';

export type FindAllWhere<T> = object & FindAllOptions<T>['where'];
