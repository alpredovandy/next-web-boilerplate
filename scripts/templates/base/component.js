module.exports = (_type, name) => ({
  type: "index",
  content: `import React from "react";
  
import { Stack, Typography } from "@mui/material";
  
import type { ${name}Props } from "@components/${name}/types";
  
const ${name}: React.FC<${name}Props> = () => {
  return (
    <Stack>
      <Typography>${name}</Typography>
    </Stack>
  );
};
  
export default ${name};
`,
  extension: `index.tsx`,
});
