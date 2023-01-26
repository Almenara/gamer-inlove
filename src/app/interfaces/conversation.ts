import { Game } from "./game";
import { User } from "./user";

export interface Conversation {
    id:                     number;
    buyer_user_id:          User;
    seller_user_id:         User;
    product_id:             Game;
    accepted:               boolean;
    created_at:             Date;
}
    