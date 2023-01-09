import { Game } from "./game";
import { Platform } from "./platform";

export interface RankingGames{
    game_id :number,
    platform_id:number,
    game_count:number,
    price?:number,
    game:Game,
    platform:Platform
  }