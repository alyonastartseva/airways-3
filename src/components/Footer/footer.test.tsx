import { describe, expect, it } from "vitest";
import { render, screen, userEvent } from "@utils/test-utils";
import { departure, Footer, ret, additional } from "@components/Footer";

describe("Footer", () => {
	it("Footer without props", () => {
		render(<Footer />);
		expect(screen.getByText(/about us/i)).toBeDefined();
		expect(screen.getByText(/terms and conditions/i)).toBeDefined();
		expect(screen.getByText(/contact us/i)).toBeDefined();
		expect(screen.getAllByRole("link")).toBeDefined();
	});

	it("Footer with 1 props", () => {
		render(<Footer departure={departure} />);
		expect(screen.getAllByText(/Departure/i)).toBeDefined();
	});

	it("Footer with 2 props", () => {
		render(<Footer departure={departure} return={ret} />);
		expect(screen.getAllByText(/Departure/i)).toBeDefined();
		expect(screen.getAllByText(/Return/i)).toBeDefined();
		expect(screen.getAllByText(/total price/i)).toBeDefined();
		expect(screen.getByRole("button")).toBeDefined();
	});

	it("Footer with 3 props", () => {
		render(
			<Footer departure={departure} return={ret} additional={additional} />,
		);
		expect(screen.getAllByText(/Departure/i)).toBeDefined();
		expect(screen.getAllByText(/return/i)).toBeDefined();
		expect(screen.getAllByText(/additional services/i)).toBeDefined();
	});
});
