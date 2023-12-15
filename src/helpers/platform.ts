import { SOURCE_PLATFORM } from "@constants/configs";

export function getPlatformOS() {
  const userAgent = window.navigator.userAgent;

  const isIOS =
    (/iPad|iPhone|iPod/.test(userAgent) ||
      (/Mac|Mac OS|MacIntel/gi.test(userAgent) &&
        (navigator.maxTouchPoints > 1 || "ontouchend" in document))) &&
    !(window as any).MSStream;

  switch (true) {
    case isIOS:
      return "iOS";

    case /Macintosh|Mac|Mac OS|MacIntel|MacPPC|Mac68K/gi.test(userAgent):
      return "Mac OS";

    case /'Win32|Win64|Windows|Windows NT|WinCE/gi.test(userAgent):
      return "Windows";

    case /Android/gi.test(userAgent):
      return "Android";

    case /Linux/gi.test(userAgent):
      return "Linux";

    default:
      return null;
  }
}

export function getSourcePlatformOS() {
  const userAgent = getPlatformOS();

  if (userAgent === "Android" || userAgent === "iOS")
    return SOURCE_PLATFORM.MOBILE;

  return SOURCE_PLATFORM.DESKTOP;
}
