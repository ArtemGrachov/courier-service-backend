import { ESortOrder } from 'src/constants/sort';
import { EOrdersSortBy } from './constants';

export interface IGetOrdersQuery {
  page: number;
  itemsPerPage: number;
  couriers?: number[];
  senders?: number[];
  receivers?: number[];
  sortBy?: EOrdersSortBy,
  sortOrder?: ESortOrder,
}

