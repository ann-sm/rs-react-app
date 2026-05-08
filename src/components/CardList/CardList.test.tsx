import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { mockCardList, mockCardListPropsMissing } from '../../__tests__/mockCardList';

describe('CardList', () => {
  
  it('renders correct number of items', () => {
    render(<CardList pokemons={mockCardList.pokemons} isLoading={mockCardList.isLoading} />);
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(2);
  });
  
  it('displays no results message when array is empty', () => {
    render(<CardList pokemons={[]} isLoading={mockCardList.isLoading} />);
    expect(screen.getByText(/No pokemons found/i)).toBeInTheDocument();
  });
  
  it('shows loading state while fetching data', () => {
    render(<CardList pokemons={mockCardList.pokemons} isLoading={true} />);
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
  
  it('correctly displays item names and descriptions', () => {
    render(<CardList pokemons={mockCardList.pokemons} isLoading={mockCardList.isLoading} />);
    mockCardList.pokemons.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(`height: ${item.height}`)).toBeInTheDocument();
      expect(screen.getByText(`weight: ${item.weight}`)).toBeInTheDocument();
      expect(screen.getByText(item.abilities.join(','))).toBeInTheDocument();
    });
  });
  
  it('handles missing or undefined data gracefully', () => {
    render(<CardList pokemons={mockCardListPropsMissing.pokemons} isLoading={mockCardListPropsMissing.isLoading}/>);
    const imageElements = screen.getAllByRole('img');
    const imageURLs = mockCardListPropsMissing.pokemons.map(item => item.image);

    imageElements.forEach(image => {
      imageURLs.forEach(url => {
        expect(image).not.toHaveAttribute('src', url);
      })
    })
  }); 
  // it('displays error message when API call fails', () => {
  // });
  
  // it('shows appropriate error for different HTTP status codes (4xx, 5xx)', () => {
  // });
})