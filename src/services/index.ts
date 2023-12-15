import Firebase from "@services/adapters/Firebase";
import Newrelic from "@services/adapters/Newrelic";
import FeatureFlagsService from "@services/FeatureFlagService";

import AuthedHttpClient from "./adapters/AuthedHttpClient";
import HttpClient from "./adapters/HttpClient";
import LocalStorage from "./adapters/LocalStorage";
import AuthService from "./AuthService";
import ExampleService from "./ExampleService";

const firebase = new Firebase();
const newrelic = new Newrelic();
const httpClient = new HttpClient(newrelic);
const storage = new LocalStorage();

export const authService = new AuthService(httpClient, storage);

const authedHttpClient = new AuthedHttpClient(newrelic, storage, authService);

export const featureFlagService = new FeatureFlagsService(firebase);

/** TODO: Remove this line after use this example */
export const exampleService = new ExampleService(authedHttpClient);
