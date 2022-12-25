export interface Platform {
    id:                     number;
    name:                   string;
    platform_logo?:         string;
    category?:              string;
    generation:             number;
    abbreviation?:          string;
    alternative_name?:      string;
    slug:                   string;
    summary?:               string;
    platform_family_id?:    number;
    created_at:             Date;
    updated_at:             Date;
}