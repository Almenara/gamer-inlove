import { UserGame } from './user_game';
import { Game } from "./game";
import { UserWishgame } from './user_wishgame';

export interface GameData {
    game:           Game;
    collection?:    UserGame[];
    wishlist?:      UserWishgame[];
}
