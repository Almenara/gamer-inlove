import { Platform } from './platform';
import { User } from "./user";

export interface UserPlatform {
    id:             number;
    user_id:        number;
    platform_id:    number;
    delivery_price: number;
    for_sale:       number;
    price:          number;
    status:         number | string;
    comments:       null | string;
    created_at:     Date;
    updated_at:     Date;
    user?:          User;
    platform?:      Platform;
}
