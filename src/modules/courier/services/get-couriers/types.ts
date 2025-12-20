import { ESortOrder } from 'src/constants/sort';
import { ECouriersSortBy } from './constants';
import { ECourierStatus } from '../../constants/courier-status';

export interface IGetCouriersQuery {
  page: number;
  itemsPerPage: number;
  status?: ECourierStatus[];
  sortBy?: ECouriersSortBy,
  sortOrder?: ESortOrder,
}

