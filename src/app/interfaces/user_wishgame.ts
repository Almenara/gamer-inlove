import { Platform } from './platform';
import { Game } from "./game";
import { User } from "./user";

export interface UserWishgame {
    id:             number;
    user_id:        number;
    game_id:        number;
    platform_id:    number;
    comments:       null | string;
    created_at:     Date;
    updated_at:     Date;
    game?:          Game;
    user?:          User;
    platform?:      Platform;
}
