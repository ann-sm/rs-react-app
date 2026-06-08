export const emailValidation = (email: string): boolean => {
  const parts = email.split('@');
  if (parts.length !== 2) {
    return false;
  }
  const [localPart, domain] = parts;

  if (localPart.trim().length === 0) {
    return false;
  }
  if (!domain.includes('.')) {
    return false;
  }

  const domainParts = domain.split('.');
  if (domainParts.some((part) => part.trim().length === 0)) {
    return false;
  }

  return true;
};
