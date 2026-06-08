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
      .string()
      .required('Image is required')
      .test('is-base64', 'Image is required', (value) => {
        return !!value && value.startsWith('data:image');
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

export type FormSchemaType = yup.InferType<ReturnType<typeof createFormSchema>>;
