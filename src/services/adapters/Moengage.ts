import { getSourcePlatformOS } from "@helpers/platform";
import { separateFullName } from "@helpers/string";

declare global {
  interface Window {
    Moengage: any;
  }
}

export interface MoengageUser {
  id: string;
  email?: string;
  birthday?: Date;
  gender?: number;
  mobile?: string;
  user_name?: string;
  phoneNumber?: string;
  dob?: string;
}

export interface MoengageType {
  upsertUser(user: MoengageUser, isNew?: boolean): void;

  userLoginOrUpdate(user: MoengageUser, update?: boolean): void;

  userLogout(): void;

  trackEvent(event: string, options: any): void;

  pageViewEvent(): void;
}

class Moengage implements MoengageType {
  _moengage(): typeof window.Moengage {
    if (
      typeof window !== "undefined" &&
      typeof window?.Moengage !== "undefined"
    )
      return window.Moengage;

    console.warn("Moengage not ready!");
  }

  upsertUser: MoengageType["upsertUser"] = (user, isNew = true) => {
    if (user.email) {
      this._moengage()?.add_email(user.email);
    }

    if (user.birthday) {
      this._moengage()?.add_birthday(user.birthday);
    }

    if (user.gender) {
      this._moengage()?.add_gender(user.gender);
    }

    if (user.mobile) {
      this._moengage()?.add_mobile(user.mobile);
    }

    if (user.user_name) {
      const { firstName, lastName } = separateFullName(user.user_name);
      this._moengage()?.add_user_name(user.user_name);
      this._moengage()?.add_first_name(firstName);
      this._moengage()?.add_last_name(lastName);
    }

    this._moengage()?.add_user_attribute("source", getSourcePlatformOS());

    isNew
      ? this._moengage()?.add_unique_user_id(user.id)
      : this._moengage()?.update_unique_user_id(user.id);
  };

  userLoginOrUpdate: MoengageType["userLoginOrUpdate"] = (
    user,
    update = false,
  ) => {
    const { id, user_name, email, dob, gender, phoneNumber } = user;
    const { firstName, lastName } = separateFullName(user_name ?? "");

    this._moengage()?.add_first_name(firstName);
    this._moengage()?.add_last_name(lastName);
    this._moengage()?.add_email(email);
    this._moengage()?.add_mobile(phoneNumber);
    this._moengage()?.add_user_name(user_name);
    this._moengage()?.add_gender(gender);
    this._moengage()?.add_birthday(new Date(dob ?? ""));
    this._moengage()?.add_user_attribute("source", getSourcePlatformOS());

    if (update) {
      this._moengage()?.update_unique_user_id(id);
    } else {
      this._moengage()?.add_unique_user_id(id);
    }
  };

  userLogout: MoengageType["userLogout"] = () => {
    this._moengage()?.add_first_name(null);
    this._moengage()?.add_last_name(null);
    this._moengage()?.add_email(null);
    this._moengage()?.add_mobile(null);
    this._moengage()?.add_user_name(null);
    this._moengage()?.add_gender(null);
    this._moengage()?.add_birthday(null);
    this._moengage()?.add_user_attribute("source", getSourcePlatformOS());
    this._moengage()?.destroy_session();
  };

  trackEvent: MoengageType["trackEvent"] = (event: string, options: any) => {
    this._moengage()?.track_event(event, {
      source: getSourcePlatformOS(),
      ...options,
    });
  };

  pageViewEvent: MoengageType["pageViewEvent"] = () => {
    this._moengage()?.track_page_view?.();
  };
}

export default Moengage;
