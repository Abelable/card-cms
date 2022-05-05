import { Pagination } from "./common";

export interface ChannelsSearchParams {
  per_page: number;
  page: number;
}

export interface Channel {
  id: number;
  store: string;
  channel_id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  activation_days: number | undefined;
  recharge_days: number | undefined;
  created_at: string;
  updated_at: string;
}

export interface ChannelsResult {
  data: Channel[];
  meta: { pagination: Pagination };
}
