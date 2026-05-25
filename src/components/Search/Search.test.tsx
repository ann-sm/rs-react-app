import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import App from '../../App';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const renderSearch = (
  initialValue: string,
  onSearch: (value: string) => void
) => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Search initialValue={initialValue} onSearch={onSearch} />
      </MemoryRouter>
    </Provider>
  );
};

const renderApp = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

describe('Search', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders search input and search button', () => {
    renderSearch('', () => {});
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage', () => {
    const searchValue = 'test previous search display';
    localStorage.setItem('ann-sm-pokemons', searchValue);
    renderApp();
    const input = screen.getByRole('searchbox');

    expect(input).toHaveValue(searchValue);
  });

  it('shows empty input when no saved term exists', () => {
    renderSearch('', () => {});
    const input = screen.getByRole('searchbox');

    expect(input).toHaveValue('');
  });

  it('updates input value when user types', async () => {
    renderSearch('', () => {});
    const input = screen.getByRole('searchbox');

    await user.type(input, 'bulbasaur');

    expect(input).toHaveValue('bulbasaur');
  });

  it('triggers onSearch with entered value when search button is clicked', async () => {
    const onSearch = vi.fn();
    renderSearch('', onSearch);

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, 'charmander');
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith('charmander');
  });

  it('does not trigger onSearch if entered value equals to previous search value', async () => {
    const savedValue = 'test previous search';
    localStorage.setItem('ann-sm-pokemons', savedValue);
    const onSearch = vi.fn();
    renderSearch('', onSearch);

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, savedValue);
    await user.click(button);

    expect(onSearch).not.toHaveBeenCalledWith(savedValue);
  });

  it('trims whitespace from search input before saving', async () => {
    const onSearch = vi.fn();
    renderSearch('', onSearch);

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, '   pikachu   ');
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith('pikachu');
  });
});
