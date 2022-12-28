import { Platform } from "./platform";
import { UserPlatform } from './user_platform';
import { UserWishplatform } from './user_wishplatform';

export interface PlatformData {
    platform:       Platform;
    collection?:    UserPlatform[];
    wishlist?:      UserWishplatform[];
}
