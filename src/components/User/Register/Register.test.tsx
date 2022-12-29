import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, afterEach } from "vitest";
import { Register } from "./index";

afterEach(cleanup);

describe("Register", () => {
  it("Page info and form rendered to the page", async () => {
    render(<Register />);
    const form = screen.getByRole("form");
    const heading = screen.getByText("Member Profile Details");
    expect(form).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
