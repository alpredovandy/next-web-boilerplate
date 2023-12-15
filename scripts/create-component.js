const fs = require("fs");
const colors = require("colors");

const templates = require("./templates/component");

const componentName = process.argv[2];

if (!componentName) {
  console.error(colors.red("Please supply a valid component name"));
  process.exit(1);
}

console.log(
  colors.blue("Creating Component Templates with name: " + componentName),
);

const componentDirectory = `./src/components/${componentName}`;

if (fs.existsSync(componentDirectory)) {
  console.error(colors.red(`Component ${componentName} already exists.`));
  process.exit(1);
}

fs.mkdirSync(componentDirectory);

const generatedTemplates = templates.map((template) =>
  template("components", componentName),
);

generatedTemplates.forEach((template) => {
  if (template.folder) {
    fs.mkdirSync(`${componentDirectory}/${template.folder}`);
  }
  const newDirectory = template.folder ? `${template.folder}/` : "";

  fs.writeFileSync(
    `${componentDirectory}/${newDirectory}${template.extension}`,
    template.content,
  );

  console.log(colors.yellow(`Generating components : ${template.extension}`));
});

console.log(
  colors.green("Successfully created component under: " + componentDirectory),
);
