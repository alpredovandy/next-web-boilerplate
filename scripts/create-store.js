const fs = require("fs");
const colors = require("colors");

const templates = require("./templates/store");

const storeName = process.argv[2];

if (!storeName) {
  console.error(colors.red("Please supply a valid store name"));
  process.exit(1);
}

console.log(colors.blue("Creating Store Templates with name: " + storeName));

const storeDirectory = `./src/stores/`;
const storeFileDirectory = `${storeDirectory}${storeName}Store.ts`;

if (fs.existsSync(storeFileDirectory)) {
  console.error(colors.red(`Store ${storeName} already exists.`));
  process.exit(1);
}

const generatedTemplates = templates.map((template) =>
  template("store", storeName),
);

generatedTemplates.forEach((template) => {
  const fileDirectory =
    template.type === "storeInterface"
      ? `types/${storeName}Type.ts`
      : `${storeName}Store.ts`;
  fs.writeFileSync(`${storeDirectory}${fileDirectory}`, template.content);

  console.log(colors.yellow(`Generating store : ${template.extension}`));
});

console.log(
  colors.green("Successfully created store under: " + storeDirectory),
);
