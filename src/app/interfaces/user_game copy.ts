import { UserGame } from './user_game';
import { Game } from "./game";

export interface GameData {
    game:           Game;
    collection?:     UserGame[];
}
