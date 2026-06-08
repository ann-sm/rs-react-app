import { describe, it, expect } from 'vitest';
import submissionsReducer, { addSubmission } from './submissionsSlice';
import type { SubmitedData } from './../types';

describe('submissionsSlice', () => {
  const initialState = {
    submissions: [],
  };

  const mockSubmission: SubmitedData = {
    name: 'John Doe',
    age: 25,
    email: 'john@example.com',
    gender: 'male',
    termsAccepted: true,
    image: 'data:image/png;base64,...',
    password: 'password123',
    confirmPassword: 'password123',
    country: 'Germany',
    isNew: true,
  };

  it('should return initial state', () => {
    expect(submissionsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle addSubmission', () => {
    const actual = submissionsReducer(
      initialState,
      addSubmission(mockSubmission)
    );
    expect(actual.submissions).toHaveLength(1);
    expect(actual.submissions[0]).toEqual(mockSubmission);
  });

  it('should add multiple submissions', () => {
    let state = submissionsReducer(initialState, addSubmission(mockSubmission));
    const secondSubmission = { ...mockSubmission, name: 'Jane Doe' };
    state = submissionsReducer(state, addSubmission(secondSubmission));
    expect(state.submissions).toHaveLength(2);
    expect(state.submissions[1].name).toBe('Jane Doe');
  });
});
