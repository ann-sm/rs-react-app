import { useForm, type SubmitHandler } from 'react-hook-form';
import { addSubmission } from '../../../store/submissionsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectCountries } from '../../../store/selector';
import {
  createFormSchema,
  type FormData,
} from '../../../validation/formSchema';
import { fileToBase64 } from '../../../utils/fileToBase64';
import type { FormProps, SubmitedData } from '../../../types';
import '../Form.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import {
  checkPasswordStrength,
  type PasswordStrength,
} from '../../../utils/passwordStrength';

const RHForm = ({ onSuccess }: FormProps) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const schema = createFormSchema(countries);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(
    checkPasswordStrength('')
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({ resolver: yupResolver(schema), mode: 'onChange' });

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedPassword = watch('password');

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(watchedPassword || ''));
  }, [watchedPassword]);

  const onSubmit: SubmitHandler<FormData> = async (rawData) => {
    const imageFile = rawData.image[0];

    const validatedData = await schema.validate({
      name: rawData.name,
      age: rawData.age,
      email: rawData.email,
      gender: rawData.gender,
      termsAccepted: rawData.termsAccepted,
      password: rawData.password,
      confirmPassword: rawData.confirmPassword,
      country: rawData.country,
      image: rawData.image,
    });
    const imageBase64 = await fileToBase64(imageFile);
    const data: SubmitedData = {
      ...validatedData,
      image: imageBase64,
      isNew: true,
    };
    dispatch(addSubmission(data));
    reset();
    setPasswordStrength(checkPasswordStrength(''));
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" autoComplete="off" {...register('name')} />
        {errors.name && (
          <span className="error-message">{errors.name?.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" autoComplete="off" {...register('age')} />
        {errors.age && (
          <span className="error-message">{errors.age?.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register('email')} />
        {errors.email && (
          <span className="error-message">{errors.email?.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          {...register('password')}
        />
        <div className="password-strength">
          <div className="strength-bars">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`strength-bar ${level <= passwordStrength.score ? 'active' : ''}`}
                data-strength={passwordStrength.score}
              />
            ))}
          </div>
          <span
            className={`strength-message strength-${passwordStrength.score}`}
          >
            {passwordStrength.message}
          </span>
        </div>
        {errors.password && (
          <span className="error-message">{errors.password?.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          autoComplete="off"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span className="error-message">
            {errors.confirmPassword?.message}
          </span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" accept="image/*" {...register('image')} />
        {errors.image && (
          <span className="error-message">{errors.image?.message}</span>
        )}
      </div>
      <div className="form-group">
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              id="male"
              value="male"
              {...register('gender')}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="female"
              value="female"
              {...register('gender')}
            />
            <label htmlFor="female">Female</label>
          </div>
          {errors.gender && (
            <span className="error-message">{errors.gender?.message}</span>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <input
          id="country"
          list="countries"
          autoComplete="off"
          placeholder="Start typing..."
          {...register('country')}
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && (
          <span className="error-message">{errors.country?.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="termsAccepted" className="checkbox-label">
          <input
            id="termsAccepted"
            type="checkbox"
            {...register('termsAccepted')}
          />
          I accept Terms & Conditions
        </label>
        {errors.termsAccepted && (
          <span className="error-message">{errors.termsAccepted?.message}</span>
        )}
      </div>
      <button type="submit" className="submit-button" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default RHForm;
