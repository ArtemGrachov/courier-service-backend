export interface IGetOrdersQuery {
  page: number;
  itemsPerPage: number;
  couriers?: number[];
  senders?: number[];
  receivers?: number[];
}

