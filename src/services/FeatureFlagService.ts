import type Firebase from "@services/adapters/Firebase";

export default class FeatureFlagsService {
  private readonly firebase: Firebase;

  constructor(firebase: Firebase) {
    this.firebase = firebase;
  }

  async getAll() {
    return this.firebase.getRemoteConfigs();
  }
}
