import { describe, expect, it, vitest } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  userEvent,
} from "@utils/test-utils";
import { departure, Footer, ret, additional, Empty } from "@components/Footer";
import { Container } from "@chakra-ui/react";

afterEach(() => {
  cleanup();
});

describe("Footer", () => {
  it("Footer without props", () => {
    const wrapper = render(<Footer />);
    const links = wrapper.container.querySelectorAll("a");
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  it("Footer with 1 props", () => {
    const { from, to, code, type } = departure;
    const { getByText } = render(<Footer departure={departure} />);
    expect(getByText(/select return flight/i)).toBeInTheDocument();
    expect(getByText(code)).toBeInTheDocument();
    expect(getByText(`${from} - ${to}`)).toBeInTheDocument();
    expect(getByText(type)).toBeInTheDocument();
  });

  it("Footer with 2 props", () => {
    const { from, to, code, type } = ret;
    const { getByText, queryByText } = render(
      <Footer departure={departure} return={ret} />
    );
    expect(getByText(code)).toBeInTheDocument();
    expect(getByText(`${from} - ${to}`)).toBeInTheDocument();
    const button = getByText(/see price detail/i);
    expect(queryByText(/ticket price/i)).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(queryByText(/ticket price/i)).toBeInTheDocument();
    fireEvent.click(button);
    expect(queryByText(/ticket price/i)).not.toBeInTheDocument();
  });

  it("Footer with 3 props", () => {
    const { getByText, queryByText } = render(
      <Footer departure={departure} return={ret} additional={additional} />
    );
    const button = getByText(/see price detail/i);
    expect(queryByText(/additional services/i)).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(queryByText(/additional services/i)).toBeInTheDocument();
    fireEvent.click(button);
    expect(queryByText(/additional services/i)).not.toBeInTheDocument();
  });
});
