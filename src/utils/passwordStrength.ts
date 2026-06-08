export interface PasswordStrength {
  score: number;
  message: string;
}

export const checkPasswordStrength = (password: string): PasswordStrength => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  let score = 0;

  if (hasUppercase) score++;
  if (hasLowercase) score++;
  if (hasNumber) score++;
  if (hasSpecialChar) score++;

  let message = '';

  if (score === 4) message = 'Strong password';
  else if (score === 3) message = 'Good password';
  else if (score === 2) message = 'Weak password';
  else if (score === 1) message = 'Very weak password';

  return {
    score,
    message,
  };
};
