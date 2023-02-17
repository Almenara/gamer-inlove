import { UserGame } from './user_game';
import { Game } from "./game";
import { UserWishgame } from './user_wishgame';

export interface GameData {
    game:           Game;
    collection?:    UserGame[];
    wishlist?:      UserWishgame[];
    stats?:         GameStats;
    games_for_sale: any;
}

export interface GameStats {
    sold:           GameSold[];
    wishlist:       number;
    collection:     UserGame[];
}

export interface GameSold {
    id:             number;
    seller_user_id: number;
    buyer_user_id:  number;
    game_id:        number;
    platform_id:    number;
    price:          number;
    delivery_price: number;
    status:         string;
    comments:       string;
    updated_at:     Date;
    created_at:     Date;
}