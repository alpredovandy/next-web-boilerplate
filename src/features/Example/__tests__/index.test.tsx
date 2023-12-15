/** TODO: Remove this file after use this example */
import React from "react";

import { render } from "@testing-library/react";

import ExampleFeature from "@features/Example";

describe("Test features: Example", () => {
  const renderExample = () => render(<ExampleFeature />);

  it("Snapshot", () => {
    const { container } = renderExample();

    expect(container).toMatchSnapshot();
  });
});
