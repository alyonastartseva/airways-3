import { describe, expect, it, vitest } from "vitest";
import { cleanup, render } from "@utils/test-utils";
import { departure, Footer, ret } from "@components/Footer";

afterEach(() => {
  cleanup();
});

describe("Footer", () => {
  it("Footer without props", () => {
    const wrapper = render(<Footer />);
    const links = wrapper.container.querySelectorAll("a");
    expect(links).toHaveLength(5);
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  it("Footer with 1 props", () => {
    const { container } = render(<Footer departure={departure} />);
    const headings = container.querySelectorAll("h2");
    expect(headings).toHaveLength(2);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(5);
  });

  it("Footer with 2 props", () => {
    const { container } = render(<Footer departure={departure} return={ret} />);
    const headings = container.querySelectorAll("h2");
    expect(headings).toHaveLength(4);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(11);
  });
});
