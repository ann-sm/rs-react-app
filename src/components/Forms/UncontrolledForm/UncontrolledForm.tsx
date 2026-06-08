import { useRef, useState, type SubmitEvent } from 'react';
import { addSubmission } from '../../../store/submissionsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createFormSchema } from '../../../validation/formSchema';
import { selectCountries } from '../../../store/selector';
import { fileToBase64 } from '../../../utils/fileToBase64';
import type { FormProps, SubmitedData } from '../../../types';
import { createFileList } from '../../../utils/createFileList';
import '../Form.css';
import * as yup from 'yup';

const UncontrolledForm = ({ onSuccess }: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const countries = useAppSelector(selectCountries);
  const schema = createFormSchema(countries);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);
    const imageFile = formData.get('image') as File;
    const fileList = createFileList(imageFile);

    const RawData = {
      name: formData.get('name'),
      age: parseInt(formData.get('age') as string, 10),
      email: formData.get('email') as string,
      gender: formData.get('gender') as string,
      termsAccepted: formData.get('termsAccepted') === 'on',
      image: fileList,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      country: formData.get('country') as string,
    };

    try {
      const validatedData = await schema.validate(RawData, {
        abortEarly: false,
      });
      const imageBase64 = imageFile ? await fileToBase64(imageFile) : null;

      const data: SubmitedData = {
        ...validatedData,
        image: imageBase64,
      };

      dispatch(addSubmission(data));

      formRef.current?.reset();
      onSuccess();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        error.inner.map((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" autoComplete="off" />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" autoComplete="off" />
        {errors.age && <span className="error-message">{errors.age}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" autoComplete="off" />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="off"
        />
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" name="image" accept="image/*" />
        {errors.image && <span className="error-message">{errors.image}</span>}
      </div>
      <div className="form-group">
        <div className="radio-group">
          <div className="radio-option">
            <input type="radio" id="male" value="male" name="gender" />
            <label htmlFor="male">Male</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="female" value="female" name="gender" />
            <label htmlFor="female">Female</label>
          </div>
          {errors.gender && (
            <span className="error-message">{errors.gender}</span>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <input
          id="country"
          name="country"
          list="countries"
          autoComplete="off"
          placeholder="Start typing..."
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && (
          <span className="error-message">{errors.country}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="termsAccepted" className="checkbox-label">
          <input id="termsAccepted" type="checkbox" name="termsAccepted" />I
          accept Terms & Conditions
        </label>
        {errors.termsAccepted && (
          <span className="error-message">{errors.termsAccepted}</span>
        )}
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
