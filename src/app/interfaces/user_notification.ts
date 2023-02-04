import { Game } from 'src/app/interfaces/game';
import { User } from './user';
export interface UserNotification {
    id:                     number;
    user_id:                number;
    from_user_id:           number;
    from_user:               User;
    product_id?:            number;
    product?:               Game;
    user_product_id?:       number;
    buyer_user_id?:         number;
    conversation_id?:       number;
    reason:                 string;
    seen:                   boolean;
    created_at:             Date;
    updated_at:             Date;
}