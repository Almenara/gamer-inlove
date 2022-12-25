export interface User {
    id:             undefined | number;
    name:           string;
    surname:        string;
    username:       string;
    email:          string;
    password:       string;
    image:          string | null | undefined;
    is_shop:        boolean;
    shops?:         Shop[];
    ecommerces?:    Ecommerce[];
}
export interface Shop{
    id:             null | number;
    user_id:        number;
    shop_name:      string;
    shop_address:   string;
    country:        string;
    city:           string;
    cp:             string;
    lat:            string;
    lon:            string;
}
export interface Ecommerce{
    id:             null | number;
    user_id:        number;
    shop_name:      string;
    shop_url:       string;
    country:        string;
}