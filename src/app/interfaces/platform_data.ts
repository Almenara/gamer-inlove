import { Platform } from "./platform";
import { PlatformForSale } from "./platform_for_sale";
import { UserPlatform } from './user_platform';
import { UserWishplatform } from './user_wishplatform';

export interface PlatformData {
    platform:       Platform;
    collection?:    UserPlatform[];
    wishlist?:      UserWishplatform[];
    forSale?:       PlatformForSale[];
}
