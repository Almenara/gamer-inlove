import { Platform } from './platform';
import { UserGame } from './user_game';
import { Game } from "./game";
import { User } from "./user";

export interface Conversation {
    id:                     number;
    buyer_user_id:          number;
    buyer:                  User;
    seller_user_id:         number;
    seller:                 User;
    product_id:             number;
    user_game:              UserGame;
    game:                   Game;
    platform:               Platform;
    accepted:               boolean;
    created_at:             Date;
}
    