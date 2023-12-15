module.exports = (type, name) => {
  const typeName = (type.charAt(0).toUpperCase() + type.slice(1)).replace(
    /s$/,
    "",
  );

  return {
    type: "test",
    folder: "__tests__",
    content: `import React from "react";
  
import { render } from "@testing-library/react";
    
import ${name}${typeName} from "@${type}/${name}";
    
describe("Test ${type}: ${name}", () => {
  const render${name} = () => render(<${name}${typeName} />);
    
  it("Snapshot", () => {
    const { container } = render${name}();
    
    expect(container).toMatchSnapshot();
  });
});
`,
    extension: `index.test.tsx`,
  };
};
