module.exports = (type, name) => ({
  type: "test",
  folder: "__tests__",
  content: `import React from "react";

import { render } from "@testing-library/react";

import ${name} from "@${type}/${name}";
import type { ${name}Props } from "@${type}/${name}/types";

describe("Test ${type}: ${name}", () => {
  let props: ${name}Props;
  const render${name} = () => render(<${name} {...props} />);

  it("Snapshot", () => {
    const { container } = render${name}();

    expect(container).toMatchSnapshot();
  });
});
`,
  extension: `index.test.tsx`,
});
