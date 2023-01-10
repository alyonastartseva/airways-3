import { describe, expect, it } from "vitest";
import { render, screen, userEvent } from "@utils/test-utils";
import { departure, Footer, ret, additional } from "@components/Footer";

describe("Footer", () => {
  it("Footer without props", () => {
    const { container } = render(<Footer />);
  });

  it("Footer with 1 props", () => {
    const { container } = render(<Footer departure={departure} />);
  });

  it("Footer with 2 props", () => {
    const { container } = render(<Footer departure={departure} return={ret} />);
  });

  it("Footer with 3 props", () => {
    const { container } = render(
      <Footer departure={departure} return={ret} additional={additional} />
    );
  });
});
