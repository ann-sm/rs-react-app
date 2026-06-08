import { describe, it, expect } from 'vitest';
import { emailValidation } from './emailValidation';

describe('emailValidation', () => {
  it('should return true for valid email', () => {
    expect(emailValidation('user@example.com')).toBe(true);
    expect(emailValidation('name@domain.co.uk')).toBe(true);
  });

  it('should return false for email without @', () => {
    expect(emailValidation('userexample.com')).toBe(false);
  });

  it('should return false for email with multiple @', () => {
    expect(emailValidation('user@example@com')).toBe(false);
  });

  it('should return false for empty local part', () => {
    expect(emailValidation('@example.com')).toBe(false);
  });

  it('should return false for domain without dot', () => {
    expect(emailValidation('user@example')).toBe(false);
  });

  it('should return false for domain with dot at start', () => {
    expect(emailValidation('user@.example.com')).toBe(false);
  });
});
