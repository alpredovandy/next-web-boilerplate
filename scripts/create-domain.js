const fs = require("fs");
const colors = require("colors");

const templates = require("./templates/domains");

const domainName = process.argv[2];

if (!domainName) {
  console.error(colors.red("Please supply a valid domain name"));
  process.exit(1);
}

console.log(colors.blue("Creating Domain Templates with name: " + domainName));

const domainDirectory = `./src/domains/${domainName}.ts`;

if (fs.existsSync(domainDirectory)) {
  console.error(colors.red(`Domain ${domainName} already exists.`));
  process.exit(1);
}

const generatedTemplates = templates.map((template) =>
  template("domains", domainName),
);

generatedTemplates.forEach((template) => {
  fs.writeFileSync(`${domainDirectory}`, template.content);

  console.log(colors.yellow(`Generating domains : ${template.extension}`));
});

console.log(
  colors.green("Successfully created domain under: " + domainDirectory),
);
