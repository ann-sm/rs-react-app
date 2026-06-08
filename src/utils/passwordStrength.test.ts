import { describe, it, expect } from 'vitest';
import { checkPasswordStrength } from './passwordStrength';

describe('checkPasswordStrength', () => {
  it('should return score 0 for empty password', () => {
    const result = checkPasswordStrength('');
    expect(result.score).toBe(0);
    expect(result.message).toBe('');
  });

  it('should detect uppercase letters', () => {
    const result = checkPasswordStrength('A');
    expect(result.score).toBe(1);
  });

  it('should detect lowercase letters', () => {
    const result = checkPasswordStrength('a');
    expect(result.score).toBe(1);
  });

  it('should detect numbers', () => {
    const result = checkPasswordStrength('1');
    expect(result.score).toBe(1);
  });

  it('should detect special characters', () => {
    const result = checkPasswordStrength('!');
    expect(result.score).toBe(1);
  });

  it('should return score 4 for strong password', () => {
    const result = checkPasswordStrength('Abc123!@#');
    expect(result.score).toBe(4);
    expect(result.message).toBe('Strong password');
  });

  it('should return score 3 for good password', () => {
    const result = checkPasswordStrength('Abc123');
    expect(result.score).toBe(3);
    expect(result.message).toBe('Good password');
  });

  it('should return score 2 for weak password', () => {
    const result = checkPasswordStrength('Abc');
    expect(result.score).toBe(2);
    expect(result.message).toBe('Weak password');
  });
});
