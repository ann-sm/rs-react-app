import { Provider } from 'react-redux';
import { createTestStore } from './setup';
import type { ReactNode } from 'react';

export const TestWrapper = ({ children }: { children: ReactNode }) => {
  const store = createTestStore();
  return <Provider store={store}>{children}</Provider>;
};
