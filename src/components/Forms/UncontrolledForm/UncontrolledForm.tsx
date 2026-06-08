import * as yup from 'yup';
import { useRef, type SubmitEvent } from 'react';
import { addSubmission } from '../../../store/submissionsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createFormSchema } from '../../../validation/formSchema';
import { selectCountries } from '../../../store/selector';
import { fileToBase64 } from '../../../utils/fileToBase64';
import { imageValidation } from '../../../validation/imageValidation';
import '../Form.css';

const UncontrolledForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const countries = useAppSelector(selectCountries);
  const schema = createFormSchema(countries);

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);
    const imageFile = formData.get('image') as File | null;
    const imageBase64 =
      imageFile && imageValidation(imageFile)
        ? await fileToBase64(imageFile)
        : null;

    const data = {
      name: formData.get('name'),
      age: parseInt(formData.get('age') as string, 10),
      email: formData.get('email') as string,
      gender: formData.get('gender') as string,
      termsAccepted: formData.get('termsAccepted') === 'on',
      image: imageBase64,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      country: formData.get('country') as string,
    };

    try {
      const validatedData = await schema.validate(data);
      dispatch(addSubmission(validatedData));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.log(error.inner);
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" autoComplete="off" />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" autoComplete="off" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" autoComplete="off" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" name="image" accept="image/*" />
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
      </div>
      <div className="form-group">
        <label htmlFor="termsAccepted" className="checkbox-label">
          <input id="termsAccepted" type="checkbox" name="termsAccepted" />I
          accept Terms & Conditions
        </label>
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
