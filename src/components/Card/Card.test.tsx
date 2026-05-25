import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { CardPropsMissing, mockCard } from '../../__tests__/mocks';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';
import {
  togglePokemon,
  unselectAllPokemons,
} from '../../store/selectedPokemonsSlice';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import type { Pokemon } from '../../types';

const user = userEvent.setup();

const renderCard = (pokemon: Pokemon) => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Card data={pokemon} />
      </MemoryRouter>
    </Provider>
  );
};

describe('Card', () => {
  beforeEach(() => {
    store.dispatch(unselectAllPokemons());
  });

  it('renders item name correctly', () => {
    renderCard(mockCard.data);
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });

  it('renders item description corectly', () => {
    renderCard(mockCard.data);

    expect(screen.getByText('overgrow,chlorophyll')).toBeInTheDocument();
    expect(
      screen.getByText(`height: ${mockCard.data.height}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`weight: ${mockCard.data.weight}`)
    ).toBeInTheDocument();
  });

  it('renders image with correct src', () => {
    renderCard(mockCard.data);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', mockCard.data.image);
  });

  it('handles missing props gracefully', () => {
    renderCard(CardPropsMissing.data);
    const images = screen.queryAllByRole('img');

    expect(images).toHaveLength(0);
    expect(screen.getByText('No image available')).toBeInTheDocument();
    expect(screen.getByText('n/a')).toBeInTheDocument();
  });

  it('renders checkbox input', () => {
    renderCard(mockCard.data);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('checkbox should be checked when pokemon is selected in Redux store', () => {
    store.dispatch(togglePokemon(mockCard.data));
    renderCard(mockCard.data);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(true);
  });

  it('should dispatch togglePokemon action when checkbox is clicked', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    renderCard(mockCard.data);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'selectedPokemons/togglePokemon',
      payload: mockCard.data,
    });
    dispatchSpy.mockRestore();
  });

  it('should stop propagation when clicking checkbox', () => {
    const onClickMock = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <div onClick={onClickMock}>
            <Card data={mockCard.data} />
          </div>
        </MemoryRouter>
      </Provider>
    );
    const checkbox = screen.getByRole('checkbox');
    user.click(checkbox);
    expect(onClickMock).not.toHaveBeenCalled();
  });
});
