import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { addSubmission } from '../../../store/submissionsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectCountries } from '../../../store/selector';
import { createFormSchema } from '../../../validation/formSchema';
import { imageValidation } from '../../../validation/imageValidation';
import { fileToBase64 } from '../../../utils/fileToBase64';
import type { RawData, SubmitedData } from '../../../types';
import '../Form.css';

const RHForm = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const schema = createFormSchema(countries);

  const { register, handleSubmit } = useForm<RawData>({ mode: 'onChange' });

  const onSubmit = async (rawData: RawData) => {
    const imageFile = rawData.image[0];
    const imageBase64 =
      imageFile && imageValidation(imageFile)
        ? await fileToBase64(imageFile)
        : null;

    const data: SubmitedData = {
      name: rawData.name,
      age: rawData.age,
      email: rawData.email,
      gender: rawData.gender,
      termsAccepted: rawData.termsAccepted,
      password: rawData.password,
      confirmPassword: rawData.confirmPassword,
      country: rawData.country,
      image: imageBase64,
    };

    try {
      await schema.validate(data);
      dispatch(addSubmission(data));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.log(error.inner);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" {...register('name')} />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" {...register('age')} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register('email')} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register('password')} />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" accept="image/*" {...register('image')} />
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
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default RHForm;
