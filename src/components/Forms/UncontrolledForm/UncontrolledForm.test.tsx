import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UncontrolledForm from './UncontrolledForm';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addSubmission } from '../../../store/submissionsSlice';
import * as yup from 'yup';

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
  fileToBase64: vi.fn(() =>
    Promise.resolve('data:image/png;base64,uncontrolled_mock')
  ),
}));

vi.mock('../../../utils/createFileList', () => ({
  createFileList: vi.fn((file) => [file]),
}));

vi.mock('../../../utils/passwordStrength', () => ({
  checkPasswordStrength: vi.fn((pwd) => ({
    score: pwd ? 3 : 0,
    message: pwd ? 'Medium' : 'Empty',
  })),
}));

const mockValidateSuccess = vi.fn((data) => Promise.resolve(data));
vi.mock('../../../validation/formSchema', () => ({
  createFormSchema: vi.fn(() => ({
    validate: mockValidateSuccess,
  })),
}));

describe('UncontrolledForm Component', () => {
  const mockDispatch = vi.fn();
  const mockOnSuccess = vi.fn();
  const mockCountries = ['Canada', 'France'];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockReturnValue(mockCountries);
    mockValidateSuccess.mockImplementation((data) => Promise.resolve(data));
  });

  it('renders all uncontrolled inputs correctly', async () => {
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    await waitFor(() => {
      expect(screen.getByLabelText(/^Name:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Age:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Email:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Password:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Confirm Password:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Image:/i)).toBeInTheDocument();

      expect(screen.getByLabelText(/^Male$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Female$/i)).toBeInTheDocument();

      expect(screen.getByLabelText(/^Country:/i)).toBeInTheDocument();
      expect(
        screen.getByLabelText(/I accept Terms & Conditions/i)
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Submit/i })).toBeEnabled();
    });
  });

  it('triggers password strength updates natively onChange', async () => {
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);
    const passwordInput = screen.getByLabelText(/^Password:/i);

    await userEvent.type(passwordInput, 'pass');
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('submits form inputs accurately and triggers store dispatch', async () => {
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);
    const file = new File(['content'], 'avatar.jpg', { type: 'image/jpeg' });

    await userEvent.type(screen.getByLabelText(/^Name:/i), 'Alice');
    await userEvent.type(screen.getByLabelText(/^Age:/i), '30');
    await userEvent.type(screen.getByLabelText(/^Email:/i), 'alice@test.com');
    await userEvent.type(
      screen.getByLabelText(/^Password:/i),
      'securePassword'
    );
    await userEvent.type(
      screen.getByLabelText(/^Confirm Password:/i),
      'securePassword'
    );
    await userEvent.upload(screen.getByLabelText(/^Image:/i), file);

    await userEvent.click(screen.getByLabelText(/^Female$/i));

    await userEvent.type(screen.getByLabelText(/^Country:/i), 'Canada');
    await userEvent.click(
      screen.getByLabelText(/I accept Terms & Conditions/i)
    );

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(mockValidateSuccess).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith(
        addSubmission(
          expect.objectContaining({
            name: 'Alice',
            age: 30,
            email: 'alice@test.com',
            gender: 'female',
            country: 'Canada',
            termsAccepted: true,
            image: 'data:image/png;base64,uncontrolled_mock',
            isNew: true,
          })
        )
      );
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('displays error messages when validation fails', async () => {
    const validationError = new yup.ValidationError(
      'Validation failed',
      null,
      'name'
    );
    validationError.inner = [
      {
        path: 'name',
        message: 'Name is a required field',
      } as yup.ValidationError,
      { path: 'email', message: 'Email must be valid' } as yup.ValidationError,
    ];
    mockValidateSuccess.mockRejectedValueOnce(validationError);

    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Name is a required field')).toBeInTheDocument();
      expect(screen.getByText('Email must be valid')).toBeInTheDocument();
      expect(mockDispatch).not.toHaveBeenCalled();
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });
  });
});
