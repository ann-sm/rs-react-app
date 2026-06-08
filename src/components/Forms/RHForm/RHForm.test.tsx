import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RHForm from './RHForm';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
// import { addSubmission } from '../../../store/submissionsSlice';
// import { fileToBase64 } from '../../../utils/fileToBase64';

vi.mock('../../../store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../../store/submissionsSlice', () => ({
  addSubmission: vi.fn((data) => ({
    type: 'submissions/addSubmission',
    payload: data,
  })),
}));

vi.mock('../../../utils/fileToBase64', () => ({
  fileToBase64: vi.fn(() => Promise.resolve('data:image/png;base64,mocked')),
}));

vi.mock('../../../utils/passwordStrength', () => ({
  checkPasswordStrength: vi.fn((pwd) => ({
    score: pwd.length > 5 ? 4 : 1,
    message: pwd.length > 5 ? 'Strong' : 'Weak',
  })),
}));

const mockValidate = vi.fn((data) => Promise.resolve(data));
vi.mock('../../../validation/formSchema', () => ({
  createFormSchema: vi.fn(() => ({
    validate: mockValidate,
  })),
}));

describe('RHForm Component', () => {
  const mockDispatch = vi.fn();
  const mockOnSuccess = vi.fn();
  const mockCountries = ['United States', 'Canada', 'Germany'];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockReturnValue(mockCountries);
  });

  // it('renders all form elements properly', () => {
  //   render(<RHForm onSuccess={mockOnSuccess} />);

  //   expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Age:/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/^Password:/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Confirm Password:/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Image:/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Male/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Female/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Country:/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/I accept Terms & Conditions/i)).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  // });

  it('updates password strength indicator when password changes', async () => {
    render(<RHForm onSuccess={mockOnSuccess} />);
    const passwordInput = screen.getByLabelText(/^Password:/i);

    await userEvent.type(passwordInput, 'secret123');

    expect(screen.getByText('Strong')).toBeInTheDocument();
  });

  // it('submits the form data successfully with valid inputs', async () => {
  //   render(<RHForm onSuccess={mockOnSuccess} />);

  //   const file = new File(['hello'], 'profile.png', { type: 'image/png' });

  //   await userEvent.type(screen.getByLabelText(/Name:/i), 'John Doe');
  //   await userEvent.type(screen.getByLabelText(/Age:/i), '25');
  //   await userEvent.type(screen.getByLabelText(/Email:/i), 'john@example.com');
  //   await userEvent.type(screen.getByLabelText(/^Password:/i), 'Password123!');
  //   await userEvent.type(screen.getByLabelText(/Confirm Password:/i), 'Password123!');
  //   await userEvent.upload(screen.getByLabelText(/Image:/i), file);
  //   await userEvent.click(screen.getByLabelText(/Male/i));
  //   await userEvent.type(screen.getByLabelText(/Country:/i), 'Germany');
  //   await userEvent.click(screen.getByLabelText(/I accept Terms & Conditions/i));

  //   const submitBtn = screen.getByRole('button', { name: /Submit/i });

  //   await userEvent.click(submitBtn);

  //   await waitFor(() => {
  //     expect(mockValidate).toHaveBeenCalled();
  //     expect(fileToBase64).toHaveBeenCalledWith(file);
  //     expect(mockDispatch).toHaveBeenCalledWith(
  //       addSubmission(expect.objectContaining({
  //         name: 'John Doe',
  //         age: '25',
  //         email: 'john@example.com',
  //         gender: 'male',
  //         country: 'Germany',
  //         termsAccepted: true,
  //         image: 'data:image/png;base64,mocked',
  //         isNew: true,
  //       }))
  //     );
  //     expect(mockOnSuccess).toHaveBeenCalled();
  //   });
  // });
});
