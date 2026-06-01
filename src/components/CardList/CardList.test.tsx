import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { mockCardList, mockCardListPropsMissing } from '../../__tests__/mocks';
import { MemoryRouter } from 'react-router-dom';
import type { Pokemon } from '../../types';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const renderCardList = (
  pokemons: Pokemon[],
  isLoading: boolean,
  isFetching: boolean
) => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CardList
          pokemons={pokemons}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      </MemoryRouter>
    </Provider>
  );
};

describe('CardList', () => {
  it('renders correct number of items', () => {
    renderCardList(
      mockCardList.pokemons,
      mockCardList.isLoading,
      mockCardList.isFetching
    );
    const cards = screen.getAllByRole('article');

    expect(cards).toHaveLength(2);
  });

  it('displays no results message when array is empty', () => {
    renderCardList([], mockCardList.isLoading, mockCardList.isFetching);

    expect(screen.getByText(/No pokemons found/i)).toBeInTheDocument();
  });

  it('shows loading state while fetching data', () => {
    renderCardList(mockCardList.pokemons, true, true);

    expect(screen.getByLabelText('animate-spin')).toBeInTheDocument();
  });

  it('correctly displays item names and descriptions', () => {
    renderCardList(
      mockCardList.pokemons,
      mockCardList.isLoading,
      mockCardList.isFetching
    );

    mockCardList.pokemons.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(`height: ${item.height}`)).toBeInTheDocument();
      expect(screen.getByText(`weight: ${item.weight}`)).toBeInTheDocument();
      expect(screen.getByText(item.abilities.join(','))).toBeInTheDocument();
    });
  });

  it('handles missing or undefined data gracefully', () => {
    renderCardList(
      mockCardListPropsMissing.pokemons,
      mockCardListPropsMissing.isLoading,
      mockCardListPropsMissing.isFetching
    );

    const imageElements = screen.queryAllByRole('img');
    expect(imageElements).toHaveLength(0);

    const noImageElements = screen.getAllByText('No image available');
    expect(noImageElements).toHaveLength(
      mockCardListPropsMissing.pokemons.length
    );
  });
});
