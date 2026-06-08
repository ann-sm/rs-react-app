import { describe, it, expect, beforeAll } from 'vitest';
import { createFileList } from './createFileList';

beforeAll(() => {
  if (typeof globalThis.DataTransfer === 'undefined') {
    class DataTransferMock {
      private dataFiles: File[] = [];

      items = {
        add: (file: File) => {
          this.dataFiles.push(file);
        },
      };

      get files(): FileList {
        const fileList = Object.create(FileList.prototype);
        Object.defineProperty(fileList, 'length', {
          get: () => this.dataFiles.length,
        });
        this.dataFiles.forEach((file, index) => {
          Object.defineProperty(fileList, index, { get: () => file });
        });
        fileList.item = (index: number) => this.dataFiles[index] || null;
        return fileList;
      }
    }

    Object.defineProperty(globalThis, 'DataTransfer', {
      value: DataTransferMock,
      writable: true,
      configurable: true,
    });
  }
});

describe('createFileList utility', () => {
  it('should convert a single File object into a FileList collection', () => {
    const mockFile = new File(['hello world'], 'hello.txt', {
      type: 'text/plain',
    });

    const result = createFileList(mockFile);

    expect(result.length).toBe(1);
    expect(result[0]).toBe(mockFile);
    expect(result.item(0)).toBe(mockFile);
  });

  it('should retain file properties such as name, size, and type', () => {
    const filename = 'avatar.png';
    const mimeType = 'image/png';
    const mockFile = new File(['imageseed'], filename, { type: mimeType });

    const result = createFileList(mockFile);
    const processedFile = result[0];

    expect(processedFile.name).toBe(filename);
    expect(processedFile.type).toBe(mimeType);
    expect(processedFile.size).toBe(mockFile.size);
  });
});
