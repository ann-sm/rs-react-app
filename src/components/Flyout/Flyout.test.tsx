import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Flyout from './Flyout';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';
import {
  togglePokemon,
  unselectAllPokemons,
} from '../../store/selectedPokemonsSlice';
import { mockCard, mockCard2 } from '../../__tests__/mocks';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

describe('Flyout', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    store.dispatch(unselectAllPokemons());
  });

  it('should render when at least one item is selected', () => {
    store.dispatch(togglePokemon(mockCard.data));
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
    expect(screen.getByText(/pokemon\(s\) selected/i)).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('renders selected pokemon count', () => {
    store.dispatch(togglePokemon(mockCard.data));
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('1 pokemon(s) selected')).toBeInTheDocument();
  });

  it('should clear all selected items when Unselect all button is clicked', async () => {
    store.dispatch(togglePokemon(mockCard.data));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Flyout />
        </MemoryRouter>
      </Provider>
    );

    const selectedPokemons = store.getState().selectedPokemons.selectedPokemons;
    expect(selectedPokemons).toHaveLength(1);

    const unselectButton = screen.getByText('Unselect all');
    user.click(unselectButton);

    await waitFor(() => {
      const updatedSelectedPokemons =
        store.getState().selectedPokemons.selectedPokemons;
      expect(updatedSelectedPokemons).toHaveLength(0);
    });
  });

  it('should hide flyout after unselecting all items', () => {});

  it('creates download link with correct filename', () => {
    const createObjectURLMock = vi.fn();
    URL.createObjectURL = createObjectURLMock;
    createObjectURLMock.mockReturnValue('blob:test-url');

    store.dispatch(togglePokemon(mockCard.data));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Flyout />
        </MemoryRouter>
      </Provider>
    );

    const downloadLink = screen.getByRole('link', {
      name: /download/i,
    });

    expect(downloadLink).toHaveAttribute('download', '1_items.csv');

    expect(downloadLink).toHaveAttribute('href', 'blob:test-url');

    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
  });

  it('creates csv content correctly', async () => {
    const createObjectURLMock = vi.fn();
    URL.createObjectURL = createObjectURLMock;

    createObjectURLMock.mockImplementation((blob: Blob) => {
      expect(blob.type).toBe('text/csv');
      return 'blob:test-url';
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(createObjectURLMock).toHaveBeenCalled();
  });

  it('renders correct csv filename for multiple pokemons', () => {
    store.dispatch(togglePokemon(mockCard.data));
    store.dispatch(togglePokemon(mockCard2.data));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const downloadLink = screen.getByRole('link', {
      name: /download/i,
    });

    expect(downloadLink).toHaveAttribute('download', '2_items.csv');
  });
});
