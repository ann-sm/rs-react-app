import { describe, it, expect, vi } from 'vitest';
import { useAppDispatch, useAppSelector } from './hooks';
import { useDispatch, useSelector } from 'react-redux';

vi.mock('react-redux', () => ({
  useDispatch: Object.assign(vi.fn(), { withTypes: vi.fn(() => vi.fn()) }),
  useSelector: Object.assign(vi.fn(), { withTypes: vi.fn(() => vi.fn()) }),
}));

describe('Typed Application Hooks', () => {
  it('should be configured using the official react-redux type extensions', () => {
    expect(useAppDispatch).toBeDefined();
    expect(useAppSelector).toBeDefined();

    expect(useDispatch.withTypes).toHaveBeenCalled();
    expect(useSelector.withTypes).toHaveBeenCalled();
  });
});
