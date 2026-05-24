import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { mockCardList, mockCardListPropsMissing } from '../../__tests__/mocks';
import { MemoryRouter } from 'react-router-dom';
import { TestWrapper } from '../../__tests__/testStore';

describe('CardList', () => {
  it('renders correct number of items', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <CardList
            pokemons={mockCardList.pokemons}
            isLoading={mockCardList.isLoading}
          />
        </MemoryRouter>
      </TestWrapper>
    );
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(2);
  });

  it('displays no results message when array is empty', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <CardList pokemons={[]} isLoading={mockCardList.isLoading} />
        </MemoryRouter>
      </TestWrapper>
    );
    expect(screen.getByText(/No pokemons found/i)).toBeInTheDocument();
  });

  it('shows loading state while fetching data', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <CardList pokemons={mockCardList.pokemons} isLoading={true} />
        </MemoryRouter>
      </TestWrapper>
    );
    expect(screen.getByLabelText('animate-spin')).toBeInTheDocument();
  });

  it('correctly displays item names and descriptions', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <CardList
            pokemons={mockCardList.pokemons}
            isLoading={mockCardList.isLoading}
          />
        </MemoryRouter>
      </TestWrapper>
    );
    mockCardList.pokemons.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(`height: ${item.height}`)).toBeInTheDocument();
      expect(screen.getByText(`weight: ${item.weight}`)).toBeInTheDocument();
      expect(screen.getByText(item.abilities.join(','))).toBeInTheDocument();
    });
  });

  it('handles missing or undefined data gracefully', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <CardList
            pokemons={mockCardListPropsMissing.pokemons}
            isLoading={mockCardListPropsMissing.isLoading}
          />
        </MemoryRouter>
      </TestWrapper>
    );
    const imageElements = screen.queryAllByRole('img');
    expect(imageElements).toHaveLength(0);

    const noImageElements = screen.getAllByText('No image available');
    expect(noImageElements).toHaveLength(
      mockCardListPropsMissing.pokemons.length
    );
  });
});
