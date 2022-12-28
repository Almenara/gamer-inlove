import { Platform } from './platform';
import { User } from "./user";

export interface UserWishplatform {
    id:             number;
    user_id:        number;
    platform_id:    number;
    comments:       null | string;
    created_at:     Date;
    updated_at:     Date;
    user?:          User;
    platform?:      Platform;
}
