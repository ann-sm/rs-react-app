import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { CardPropsMissing, mockCard } from '../../__tests__/mockCard';

describe('Card', () => {
  it('renders item name correctly', () => {
    render(<Card data={mockCard.data} />);
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
  });

  it('renders item description corectly', () => {
    render(<Card data={mockCard.data} />);
    expect(screen.getByText('overgrow,chlorophyll')).toBeInTheDocument();
    expect(
      screen.getByText(`height: ${mockCard.data.height}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`weight: ${mockCard.data.weight}`)
    ).toBeInTheDocument();
  });

  it('renders image with correct src', () => {
    render(<Card data={mockCard.data} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockCard.data.image);
  });

  it('handles missing props gracefully', () => {
    render(<Card data={CardPropsMissing.data} />);
    const image = screen.getByRole('img');
    expect(image).not.toHaveAttribute('src', mockCard.data.image);
  });
});
