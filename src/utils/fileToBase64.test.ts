import { describe, it, expect } from 'vitest';
import { fileToBase64 } from './fileToBase64';

describe('fileToBase64', () => {
  it('should convert file to base64 string', async () => {
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const base64 = await fileToBase64(file);
    expect(base64).toMatch(/^data:text\/plain;base64,/);
  });

  it('should handle image files', async () => {
    const file = new File(['image'], 'image.png', { type: 'image/png' });
    const base64 = await fileToBase64(file);
    expect(base64).toMatch(/^data:image\/png;base64,/);
  });
});
