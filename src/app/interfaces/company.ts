export interface Company {
    id:             number;
    name:           string;
    parent?:        number;
    country?:       number;
    logo?:          string;
    slug:           string;
    start_date?:    Date;
    website?:       string;
    created_at:     Date;
    updated_at:     Date;
}