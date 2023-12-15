module.exports = (_type, name) => ({
  type: "types",
  content: `import type HttpClient from "@services/adapters/HttpClient";

export interface ${name}ServiceType {
  foo: () => void;
}
  
class ${name}Service implements ${name}ServiceType {
  private _http: HttpClient;
  
  constructor(httpClient: HttpClient) {
    this._http = httpClient;
  }
  
  foo: ${name}ServiceType["foo"] = () => {
    /** Here your logic */
  };
}
  
export default ${name}Service;
`,
  extension: `${name}Service.ts`,
});
