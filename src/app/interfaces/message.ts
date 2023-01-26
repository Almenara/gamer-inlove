import { Conversation } from "./conversation";

export interface Message {
    id?:                    number;
    conversation_id?:       number;
    conversation?:          Conversation;
    sender_user_id:         undefined | number;
    receiving_user_id:      number;
    product_id:             number;
    message:                Text;
    seen:                   boolean;
    malicious_message:      boolean;
    created_at?:            Date;
}