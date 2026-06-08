export const imageValidation = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png'];
  const maxSizeInBytes = 5 * 1024 * 1024;

  if (file.size > maxSizeInBytes) {
    return false;
  }
  return validTypes.includes(file.type);
};
