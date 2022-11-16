import { Subscriptions } from './subscriptions';

export interface SubscriptionsResponse extends Subscriptions {
  serviceName: string;
  catalogName: string;
  catalogDuration: number;
  catalogPrice: number;
  dateDue: string;
}
