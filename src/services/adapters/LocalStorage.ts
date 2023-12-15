export interface StorageType {
  set(name: string, value: string | number | object): void;

  get(name: string): string | null | undefined;

  remove(name: string): void;

  clear(): void;
}

class LocalStorage implements StorageType {
  get storage(): Window["localStorage"] | null {
    // console.log(window);

    if (global?.window && window?.localStorage) return window?.localStorage;

    return null;
  }

  public set: StorageType["set"] = (name, value) => {
    let payload: string;

    switch (typeof value) {
      case "string":
        payload = value;
        break;
      case "number":
        payload = String(value);
        break;

      default:
        payload = JSON.stringify(value);
        break;
    }

    this.storage?.setItem(name, payload);
  };

  public get: StorageType["get"] = (name) => {
    return this.storage?.getItem(name);
  };

  public remove: StorageType["remove"] = (name) => {
    this.storage?.removeItem(name);
  };

  public clear: StorageType["clear"] = () => {
    this.storage?.clear();
  };
}

export default LocalStorage;
