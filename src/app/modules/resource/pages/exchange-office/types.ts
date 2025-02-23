import { ExchangeConnection, ExchangeDetailResponse } from 'src/app/shared/apis/exchange-api.service';

export interface TConnectionDialog {
  entityId: string;
  entityName: string;
  connection: ExchangeDetailResponse['exchangeConnection'];
}
