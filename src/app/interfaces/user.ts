import { UserNotification } from "./user_notification";

export interface User {
    id:                     undefined | number;
    name?:                  string;
    surname?:               string;
    username:               string;
    email?:                 string;
    repeatemail?:           string;
    password?:              string;
    repeatpassword?:        string;
    image:                  string | null | undefined;
    is_shop:                boolean;
    address?:               Address;
    shops?:                 Shop[];
    ecommerces?:            Ecommerce[];
    user_notifications?:    UserNotification[]; 
}
export interface Address{
    id?:            number;
    address:        string;
    city:           string;
    country:        string;
    zip_code:       string;
}
export interface Shop{
    id?:            number;
    user_id:        number;
    shop_name:      string;
    shop_address:   string;
    country:        string;
    city:           string;
    zip_code:       string;
    lat:            string;
    lon:            string;
}
export interface Ecommerce{
    id?:            number;
    user_id:        number;
    shop_name:      string;
    shop_url:       string;
    city:           string;
    country:        string;
}