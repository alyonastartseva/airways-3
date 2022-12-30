import { describe, expect, it } from "vitest";
import { render, screen, userEvent } from "@utils/test-utils";
import { departure, Footer, ret, additional } from "@components/Footer";

describe("Footer", () => {
	it("Footer without props", () => {
		const { container } = render(<Footer />);
		expect(container).toMatchSnapshot("0props");
	});

	it("Footer with 1 props", () => {
		const { container } = render(<Footer departure={departure} />);
		expect(container).toMatchSnapshot("1props");
	});

	it("Footer with 2 props", () => {
		const { container } = render(<Footer departure={departure} return={ret} />);
		expect(container).toMatchSnapshot("2props");
	});

	it("Footer with 3 props", () => {
		const { container } = render(
			<Footer departure={departure} return={ret} additional={additional} />,
		);
		expect(container).toMatchSnapshot("3props");
	});
});
