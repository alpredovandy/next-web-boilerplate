module.exports = (_type, name) => ({
  type: "storeInterface",
  content: `export type ${name}Type = {
  foo: string;
  bar: boolean;
  setValue: () => void;
};
`,
  extension: `${name}Type.ts`,
});
