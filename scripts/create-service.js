const fs = require("fs");
const colors = require("colors");

const templates = require("./templates/service");

const serviceName = process.argv[2];

if (!serviceName) {
  console.error(colors.red("Please supply a valid service name"));
  process.exit(1);
}

console.log(
  colors.blue("Creating Service Templates with name: " + serviceName),
);

const serviceDirectory = `./src/services/${serviceName}Service.ts`;

if (fs.existsSync(serviceDirectory)) {
  console.error(colors.red(`Service ${serviceName} already exists.`));
  process.exit(1);
}

const generatedTemplates = templates.map((template) =>
  template("services", serviceName),
);

generatedTemplates.forEach((template) => {
  fs.writeFileSync(`${serviceDirectory}`, template.content);

  console.log(colors.yellow(`Generating services : ${template.extension}`));
});

console.log(
  colors.green("Successfully created service under: " + serviceDirectory),
);
