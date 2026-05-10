import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import App from '../../App';

describe('Search', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders search input and search button', () => {
    render(<Search initialValue="" onSearch={() => {}} />);
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage', () => {
    const searchQuery = 'test previous search display';
    localStorage.setItem('ann-sm-pokemons', searchQuery);
    render(<App />);
    const input = screen.getByRole('searchbox');

    expect(input).toHaveValue(searchQuery);
  });

  it('shows empty input when no saved term exists', () => {
    render(<Search initialValue="" onSearch={() => {}} />);
    const input = screen.getByRole('searchbox');

    expect(input).toHaveValue('');
  });

  it('updates input value when user types', async () => {
    render(<Search initialValue="" onSearch={() => {}} />);
    const input = screen.getByRole('searchbox');

    await user.type(input, 'test input update');

    expect(input).toHaveValue('test input update');
  });

  it('triggers onSearch with entered value when search button is clicked', async () => {
    const onSearch = vi.fn();
    render(<Search initialValue="" onSearch={onSearch} />);
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, 'test onSearch');
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith('test onSearch');
  });

  it('does not trigger onSearch if entered value equals to previous search value', async () => {
    const previousSearchQuery = 'test previous search';
    localStorage.setItem('ann-sm-pokemons', previousSearchQuery);
    const onSearch = vi.fn();
    render(<Search initialValue="" onSearch={onSearch} />);
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, previousSearchQuery);
    await user.click(button);

    expect(onSearch).not.toHaveBeenCalledWith(previousSearchQuery);
  });

  it('trims whitespace from search input before saving', async () => {
    const onSearch = vi.fn();
    render(<Search initialValue="" onSearch={onSearch} />);
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, '   pikachu   ');
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith('pikachu');
  });
});
