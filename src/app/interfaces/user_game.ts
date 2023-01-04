import { Platform } from './platform';
import { Game } from "./game";
import { User } from "./user";

export interface UserGame {
    id:             number;
    user_id:        number;
    game_id:        number;
    platform_id:    number;
    delivery_price: number;
    for_sale:       number;
    price:          number;
    status:         number | string;
    comments:       null | string;
    created_at:     Date;
    updated_at:     Date;
    game?:          Game;
    user?:          User;
    platform?:      Platform;
}
