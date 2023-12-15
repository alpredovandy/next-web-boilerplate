import React from "react";

import { render } from "@testing-library/react";

import Header from "@components/Header";
import type { HeaderProps } from "@components/Header/types";

describe("Test components: Header", () => {
  let props: HeaderProps;
  const renderHeader = () => render(<Header {...props} />);

  it("Snapshot", () => {
    const { container } = renderHeader();

    expect(container).toMatchSnapshot();
  });
});
