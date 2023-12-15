module.exports = (_type, name) => ({
  type: "types",
  content: `import type { ${name}ServiceType } from "@services/${name}Service";
  
export interface ${name}UseCaseType {
  options(): Promise<string[]>;
}
  
class ${name}UseCase implements ${name}UseCaseType {
  private _${name.toLowerCase()}Service: ${name}ServiceType;
  
  constructor(${name.toLowerCase()}: ${name}ServiceType) {
    this._${name.toLowerCase()}Service = ${name.toLowerCase()};
  }
  
  options: ${name}UseCaseType["options"] = () =>
    this._${name.toLowerCase()}Service.getAll().then((items = []) =>
      items.map((item) => ({
        title: item,
      })),
    );
}
  
export default ${name}UseCase;  
`,
  extension: `${name}UseCase.ts`,
});
