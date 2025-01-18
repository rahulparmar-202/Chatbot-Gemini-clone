import { render, screen, within } from '@testing-library/react';
import Main from '../components/Main/Main';
import { Context } from '../context/Context';

describe('Main Component', () => {
  const mockContext = {
    showResult: false,
    onSent: vi.fn(),
    recentPrompt: 'What is AI?',
    loading: false,
    resultData: '<b>AI</b> stands for Artificial Intelligence.',
    setInput: vi.fn(),
    input: '',
    keyEnter: vi.fn(),
  };

  const renderWithContext = (contextValues) => {
    return render(
      <Context.Provider value={{ ...mockContext, ...contextValues }}>
        <Main />
      </Context.Provider>
    );
  };

  it('renders cards correctly', () => {
    renderWithContext({ showResult: false });

    // Locate cards container
    const cards = screen.getByRole('region', { name: /cards/i });

    // Check individual cards
    const card1 = within(cards).getByText(/Suggest beautifull places to see on an upcoming road trip./i);
    const card2 = within(cards).getByText(/Briefly summarize this concept: urban planning./i);

    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
  });
  
});
