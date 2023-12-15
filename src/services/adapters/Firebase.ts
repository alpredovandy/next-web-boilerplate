import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
} from "firebase/app";
import { initializeRemoteConfig } from "rey-mix";

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
} from "@constants/configs";
import { FEATURE_FLAGS } from "@constants/featureFlags";

export default class Firebase {
  readonly firebaseApp: FirebaseApp;

  constructor(options?: FirebaseOptions) {
    this.firebaseApp = initializeApp({
      apiKey: FIREBASE_API_KEY,
      projectId: FIREBASE_PROJECT_ID,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
      appId: FIREBASE_APP_ID,
      ...options,
    });
  }

  async getRemoteConfigs(userId?: string) {
    return initializeRemoteConfig(this.firebaseApp, FEATURE_FLAGS, userId);
  }
}
