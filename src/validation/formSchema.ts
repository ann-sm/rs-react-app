import * as yup from 'yup';
import { emailValidation } from './emailValidation';

export const createFormSchema = (countries: string[]) =>
  yup.object({
    name: yup
      .string()
      .required('Name is required')
      .test('uppercase-first', 'First letter must be uppercase', (name) => {
        if (!name) return false;
        return name[0] === name[0].toUpperCase();
      }),
    age: yup
      .number()
      .transform((originalValue) => {
        if (
          originalValue === '' ||
          originalValue === null ||
          originalValue === undefined
        ) {
          return undefined;
        }
        const num = Number(originalValue);
        return isNaN(num) ? undefined : num;
      })
      .required('Age is required')
      .positive('Age must be a positive number')
      .integer('Age must be a whole number'),
    email: yup
      .string()
      .required('Email is required')
      .test(
        'is-valid-email',
        'Please enter a valid email address (e.g., name@domain.com)',
        emailValidation
      ),
    gender: yup.string().required('Gender is required'),
    termsAccepted: yup
      .boolean()
      .required()
      .oneOf([true], 'You must accept the Terms and Conditions'),
    image: yup
      .mixed<FileList>()
      .required('Image is required')
      .test('file-required', 'Image is required', (value) => {
        return value && value instanceof FileList && value.length > 0;
      })
      .test(
        'file-type',
        'Only JPEG and PNG images are allowed (max 5MB)',
        (value) => {
          if (!value || !(value instanceof FileList) || value.length === 0)
            return false;
          const file = value[0];
          const validTypes = ['image/jpeg', 'image/png'];
          return validTypes.includes(file.type);
        }
      )
      .test('file-size', 'Image size must be less than 5MB', (value) => {
        if (!value || !(value instanceof FileList) || value.length === 0)
          return false;
        const file = value[0];
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        return file.size <= maxSizeInBytes;
      }),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    country: yup
      .string()
      .required('Country is required')
      .test(
        'country-exists',
        'Country must exist in the list',
        (value) => !!value && countries.includes(value)
      ),
  });

export type FormData = yup.InferType<ReturnType<typeof createFormSchema>>;
