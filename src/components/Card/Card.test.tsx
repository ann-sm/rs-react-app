import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { CardPropsMissing, mockCard } from '../../__tests__/mocks';
import { MemoryRouter } from 'react-router-dom';

describe('Card', () => {
  it('renders item name correctly', () => {
    render(
      <MemoryRouter>
        <Card data={mockCard.data} />
      </MemoryRouter>
    );
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });

  it('renders item description corectly', () => {
    render(
      <MemoryRouter>
        <Card data={mockCard.data} />
      </MemoryRouter>
    );
    expect(screen.getByText('overgrow,chlorophyll')).toBeInTheDocument();
    expect(
      screen.getByText(`height: ${mockCard.data.height}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`weight: ${mockCard.data.weight}`)
    ).toBeInTheDocument();
  });

  it('renders image with correct src', () => {
    render(
      <MemoryRouter>
        <Card data={mockCard.data} />
      </MemoryRouter>
    );
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockCard.data.image);
  });

  it('handles missing props gracefully', () => {
    render(
      <MemoryRouter>
        <Card data={CardPropsMissing.data} />
      </MemoryRouter>
    );

    const images = screen.queryAllByRole('img');
    expect(images).toHaveLength(0);
    expect(screen.getByText('No image available')).toBeInTheDocument();
    expect(screen.getByText('n/a')).toBeInTheDocument();
  });
});
