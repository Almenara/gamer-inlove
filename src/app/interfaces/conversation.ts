import { Platform } from './platform';
import { UserGame } from './user_game';
import { Game } from "./game";
import { User } from "./user";
import { GameSold } from './game_data';

export interface Conversation {
    id:                     number;
    buyer_user_id:          number;
    buyer:                  User;
    seller_user_id:         number;
    seller:                 User;
    product_id:             number;
    user_game?:             UserGame;
    game_sale?:             GameSold;
    game:                   Game;
    platform:               Platform;
    accepted:               boolean;
    created_at:             Date;
}
    