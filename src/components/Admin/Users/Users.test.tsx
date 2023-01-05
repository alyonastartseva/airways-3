import "@testing-library/jest-dom";
import { render, screen, cleanup} from "@testing-library/react";
import { expect, describe, afterEach, vi } from "vitest";
import { Users } from "./index";

afterEach(cleanup);

describe("Users", () => {
  it("Test component info rendered to the page", async () => {
    const { container } = render(<Users />);
    expect(container.querySelector("h4")).toBeInTheDocument();
    expect(container.querySelector("h4")).toHaveTextContent("Пользователи")
  });

  it("Test component table with data rendered to the page", async () => {
    vi.mock("react-query", () => {
      const testData = [
        {
          firstName: "testName",
          id: 3,
          roles: [{ id: 2, name: "ROLE_PASSENGER" }],
        },
      ];
      return {
        useQuery: vi.fn().mockReturnValue({ data: testData }),
      };
    });

    const { container } = render(<Users />);
    expect(container.querySelector("table")).toBeInTheDocument();
    expect(screen.getByText("testName")).toBeInTheDocument();
  });
});
