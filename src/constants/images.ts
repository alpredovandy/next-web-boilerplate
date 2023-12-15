import { ASSET_URL } from "@constants/configs";

const generateAssetURL = (url: string) => ASSET_URL + url;

export const COMMON_IMAGE = {
  PAGE_404: generateAssetURL("/common/page-404.png"),
  PAGE_500: generateAssetURL("/common/page-500.png"),
};

export const AuthenticationImage = {
  AuthSignInImg: generateAssetURL("/auth/placeholder.jpg"),
};
