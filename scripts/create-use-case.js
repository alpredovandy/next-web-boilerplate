const fs = require("fs");
const colors = require("colors");

const templates = require("./templates/useCases");

const useCaseName = process.argv[2];

if (!useCaseName) {
  console.error(colors.red("Please supply a valid useCases name"));
  process.exit(1);
}

console.log(
  colors.blue("Creating UseCase Templates with name: " + useCaseName),
);

const useCasesDirectory = `./src/useCases/${useCaseName}UseCase.ts`;

if (fs.existsSync(useCasesDirectory)) {
  console.error(colors.red(`UseCase ${useCaseName} already exists.`));
  process.exit(1);
}

const generatedTemplates = templates.map((template) =>
  template("useCases", useCaseName),
);

generatedTemplates.forEach((template) => {
  fs.writeFileSync(`${useCasesDirectory}`, template.content);

  console.log(colors.yellow(`Generating useCases : ${template.extension}`));
});

console.log(
  colors.green("Successfully created useCases under: " + useCasesDirectory),
);
