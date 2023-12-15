const fs = require("fs");
const colors = require("colors");

const templates = require("./templates/feature");

const featureName = process.argv[2];

if (!featureName) {
  console.error(colors.red("Please supply a valid feature name"));
  process.exit(1);
}

console.log(
  colors.blue("Creating Feature Templates with name: " + featureName),
);

const featureDirectory = `./src/features/${featureName}`;
const pageDirectory = "./src/pages";

if (fs.existsSync(featureDirectory)) {
  console.error(colors.red(`Feature ${featureName} already exists.`));
  process.exit(1);
}

fs.mkdirSync(featureDirectory);

const generatedTemplates = templates.map((template) =>
  template("features", featureName),
);

generatedTemplates.forEach((template) => {
  if (template.type === "page") {
    fs.mkdirSync(`${pageDirectory}/${template.folder}`);
    fs.writeFileSync(
      `${pageDirectory}/${template.folder}/${template.extension}`,
      template.content,
    );
  } else {
    if (
      template.folder &&
      !fs.existsSync(`${featureDirectory}/${template.folder}`)
    ) {
      fs.mkdirSync(`${featureDirectory}/${template.folder}`);
    }
    const newDirectory = template.folder ? `${template.folder}/` : "";

    fs.writeFileSync(
      `${featureDirectory}/${newDirectory}${template.extension}`,
      template.content,
    );
  }

  console.log(colors.yellow(`Generating features : ${template.extension}`));
});

console.log(colors.green("Successfully created page under: " + pageDirectory));
console.log(
  colors.green("Successfully created feature under: " + featureDirectory),
);
