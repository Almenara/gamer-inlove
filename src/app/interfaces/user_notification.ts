export interface UserNotification {
    id:                     number;
    user_id:                number;
    user_product_id?:       number;
    buyer_user_id?:         number;
    conversation_id?:       number;
    reason:                 string;
    seen:                   boolean;
    created_at:             Date;
}