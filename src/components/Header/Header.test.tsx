import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, afterEach, test } from "vitest";
import { Header } from "./index";

afterEach(cleanup);

describe("Header test", () => {
    test("Page info and form rendered to the page", async () => {
        render(<Header />);
        const button = screen.getByText("Главная страница");
        const name = screen.getByText("UX AIR");
        expect(name).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });
});
