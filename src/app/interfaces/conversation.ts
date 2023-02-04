import { Game } from "./game";
import { User } from "./user";

export interface Conversation {
    id:                     number;
    buyer_user_id:          number;
    buyer:                  User;
    seller_user_id:         number;
    seller:                 User;
    product_id:             Game;
    game:                   Game;
    accepted:               boolean;
    created_at:             Date;
}
    