import { User } from "./user";

export interface PlatformForSale {
    id:             number;
    platform_id:    number;
    for_sale:       number;
    price:          number;
    delivery_price: number;
    status:         string;
    comments:       string;
    user:           User;
    created_at:     Date;
}