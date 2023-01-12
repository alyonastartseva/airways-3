import { render, screen, fireEvent, queryByTestId } from "@utils/test-utils";
import { describe, it } from "vitest";
import { Full } from "@components/Footer/Full";
import { departure, ret, additional } from "@/components/Footer";

describe("Full component tests", () => {
  it("Show and hide price detail with additional service", () => {
    const { container } = render(
      <Full departure={departure} return={ret} additional={additional} />
    );
    const detailButton = screen.getByRole("button", {
      name: /see price details/i,
    });
    fireEvent.click(detailButton);
    const wrapper = screen.queryByTestId("detail-wrapper");
    const heads = wrapper?.querySelectorAll("h3");
    const paragraphs = wrapper?.querySelectorAll("p");
    expect(wrapper).toBeInTheDocument();
    expect(heads).toHaveLength(4);
    expect(paragraphs).toHaveLength(8);

    fireEvent.click(detailButton);
    expect(wrapper).not.toBeInTheDocument();
  });

  it("Show and hide price detail without additional service", () => {
    const { container } = render(<Full departure={departure} return={ret} />);
    const detailButton = screen.getByRole("button", {
      name: /see price details/i,
    });

    fireEvent.click(detailButton);
    const wrapper = screen.queryByTestId("detail-wrapper");
    const heads = wrapper?.querySelectorAll("h3");
    const paragraphs = wrapper?.querySelectorAll("p");
    expect(wrapper).toBeInTheDocument();
    expect(heads).toHaveLength(3);
    expect(paragraphs).toHaveLength(4);

    fireEvent.click(detailButton);
    expect(wrapper).not.toBeInTheDocument();
  });
});
