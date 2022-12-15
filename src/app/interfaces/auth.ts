export interface Auth {
    ok: boolean;
    data?: token;
    message?: string; 
}
export interface token{
    token_expires_at: string;
    accessToken: string;
    name: string;
    user_id: number;
    client_id: string; 
    created_at: string;
    expires_at: string;
    id: string;
    revoked: boolean;
    updated_at: string;
    scopes: any[];
}