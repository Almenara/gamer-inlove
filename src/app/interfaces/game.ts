import { Platform } from "./platform";

export interface Game {
    id:                     number;
    name:                   string;
    category?:              string;
    cover?:                 string;
    first_release_date?:    Date;
    franchise_id?:          number;
    parent_game?:           number;
    version_parent?:        number;
    status?:                string;
    storyline?:             string;
    summary?:               string;
    version_title?:         string;
    video?:                 string;
    website?:               string;
    slug:                   string;
    created_at:             Date;
    updated_at:             Date;
    platforms?:             Platform[];
    genres?:                any[];
}