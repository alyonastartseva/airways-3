import { fireEvent, render, screen } from "@utils/test-utils";
import { RedButton } from "@/common/RedButton/RedButton";
import { vi } from "vitest";

describe("red button", () => {
  it("", () => {
    const click = vi.fn();
    const text = "Click me";
    render(<RedButton text={text} clickHandler={click} />);
    const button = screen.getByText(text);
    fireEvent.click(button);
    expect(click).toHaveBeenCalled();
  });
});
