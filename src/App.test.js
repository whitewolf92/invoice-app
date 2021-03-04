import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "./App";

test("renders initial page", () => {
  render(<App />);
  const linkElement = screen.getByText(/Xendit PDF Exporter/i);
  expect(linkElement).toBeInTheDocument();
});
