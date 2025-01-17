import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { ContextProvider } from "../../context/Context.jsx";
import Sidebar from "./Sidebar.jsx";

describe("Sidebar Component", () => {
  it("renders without crashing", () => {
    const mockContextValue = {
      onSent: vi.fn(),
      prevPrompts: [],
      setRecentPrompt: vi.fn(),
      newChat: vi.fn(),
      assets: {
        menu_icon: "path/to/menu_icon.png",
      },
    };

    const { getByAltText } = render(
      <ContextProvider value={mockContextValue}>
        <Sidebar />
      </ContextProvider>
    );

    // Ensure the alt attribute matches what is in the component
    expect(getByAltText(/menu icon/i)).toBeInTheDocument(); // Replace with actual alt text
  });

  it("calls setExtended function when menu icon is clicked", () => {
    const setExtendedMock = vi.fn();
    const mockContextValue = {
      setExtended: setExtendedMock,
      assets: {
        menu_icon: "path/to/menu_icon.png",
      },
    };

    const { getByAltText } = render(
      <ContextProvider value={mockContextValue}>
        <Sidebar />
      </ContextProvider>
    );

    const menuIcon = getByAltText(/menu icon/i); // Replace with actual alt text
    fireEvent.click(menuIcon);

    expect(setExtendedMock).toHaveBeenCalled();
  });
});