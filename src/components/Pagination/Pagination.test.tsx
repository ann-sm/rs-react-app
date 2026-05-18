import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination', () => {
  const mockOnPrevPage = vi.fn();
  const mockOnNextPage = vi.fn();

  beforeEach(() => {
    mockOnPrevPage.mockClear();
    mockOnNextPage.mockClear();
  });

  it('displays current page and total pages', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPrevPage={mockOnPrevPage}
        onNextPage={mockOnNextPage}
      />
    );

    expect(screen.getByText('3 of 10')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPrevPage={mockOnPrevPage}
        onNextPage={mockOnNextPage}
      />
    );

    const prevButton = screen.getByText('<');
    expect(prevButton).toBeDisabled();

    const nextButton = screen.getByText('>');
    expect(nextButton).not.toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPrevPage={mockOnPrevPage}
        onNextPage={mockOnNextPage}
      />
    );

    const prevButton = screen.getByText('<');
    expect(prevButton).not.toBeDisabled();

    const nextButton = screen.getByText('>');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPrevPage with current page when previous button clicked', async () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPrevPage={mockOnPrevPage}
        onNextPage={mockOnNextPage}
      />
    );

    const prevButton = screen.getByText('<');
    await userEvent.click(prevButton);

    expect(mockOnPrevPage).toHaveBeenCalledWith(5);
    expect(mockOnNextPage).not.toHaveBeenCalled();
  });

  it('calls onNextPage with current page when next button clicked', async () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPrevPage={mockOnPrevPage}
        onNextPage={mockOnNextPage}
      />
    );

    const nextButton = screen.getByText('>');
    await userEvent.click(nextButton);

    expect(mockOnNextPage).toHaveBeenCalledWith(5);
    expect(mockOnPrevPage).not.toHaveBeenCalled();
  });

  it('handles single page correctly', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPrevPage={mockOnPrevPage}
        onNextPage={mockOnNextPage}
      />
    );

    const prevButton = screen.getByText('<');
    const nextButton = screen.getByText('>');

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
    expect(screen.getByText('1 of 1')).toBeInTheDocument();
  });
});
