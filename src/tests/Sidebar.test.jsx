import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../components/Sidebar/Sidebar'; // Adjust path as needed
import { Context } from '../context/Context'; // Adjust path as needed

describe('Sidebar Component', () => {
  const mockContext = {
    onSent: vi.fn(),
    prevPrompts: ['Prompt 1', 'Prompt 2', 'Prompt 3'],
    setRecentPrompt: vi.fn(),
    newChat: vi.fn(),
  };

  const renderWithContext = (contextValues) => {
    return render(
      <Context.Provider value={{ ...mockContext, ...contextValues }}>
        <Sidebar />
      </Context.Provider>
    );
  };

  it('toggles the sidebar when the menu icon is clicked', () => {
    renderWithContext({});

    // Ensure the sidebar is collapsed initially
    expect(screen.queryByText(/New Chat/i)).not.toBeInTheDocument();

    // Click the menu icon to expand the sidebar
    const menuIcon = screen.getByAltText('Menu Icon');
    fireEvent.click(menuIcon);

    // Ensure the sidebar expands
    expect(screen.getByText(/New Chat/i)).toBeInTheDocument();
  });

  it('calls newChat when the "New Chat" button is clicked', () => {
    renderWithContext({});
    
    // Expand the sidebar first
    const menuIcon = screen.getByAltText('Menu Icon');
    fireEvent.click(menuIcon);

    // Click the New Chat button
    const newChatButton = screen.getByText(/New Chat/i);
    fireEvent.click(newChatButton);

    // Ensure newChat function is called
    expect(mockContext.newChat).toHaveBeenCalled();
  });

  it('renders recent prompts when sidebar is expanded', () => {
    renderWithContext({});

    // Expand the sidebar first
    const menuIcon = screen.getByAltText('Menu Icon');
    fireEvent.click(menuIcon);

    // Check that recent prompts are rendered
    mockContext.prevPrompts.forEach((prompt) => {
      expect(screen.getByText(prompt.slice(0, 18) + '...')).toBeInTheDocument();
    });
  });

  it('loads a selected prompt when clicked', async () => {
    renderWithContext({});

    // Expand the sidebar first
    const menuIcon = screen.getByAltText('Menu Icon');
    fireEvent.click(menuIcon);

    // Click on the first prompt
    const firstPrompt = screen.getByText('Prompt 1...');
    fireEvent.click(firstPrompt);

    // Ensure setRecentPrompt and onSent are called
    expect(mockContext.setRecentPrompt).toHaveBeenCalledWith('Prompt 1');
    expect(mockContext.onSent).toHaveBeenCalledWith('Prompt 1');
  });

  it('displays Help, Activity, and Settings when expanded', () => {
    renderWithContext({});

    // Expand the sidebar first
    const menuIcon = screen.getByAltText('Menu Icon');
    fireEvent.click(menuIcon);

    // Check for bottom items
    expect(screen.getByText(/Help/i)).toBeInTheDocument();
    expect(screen.getByText(/Activity/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
  });
});
