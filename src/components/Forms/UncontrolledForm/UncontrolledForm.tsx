import { useRef, type SubmitEvent } from 'react';
import {
  addSubmission,
  type SubmitedData,
} from '../../../store/submissionsSlice';
import { useAppDispatch } from '../../../store/hooks';
import { store } from '../../../store/store';
import '../Form.css';

const UncontrolledForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);
    const rawData = {
      name: formData.get('name') as string,
      age: parseInt(formData.get('age') as string),
      email: formData.get('email') as string,
      gender: formData.get('gender') as string,
      termsAccepted: formData.get('termsAccepted') === 'on',
    };

    const submission = {
      ...rawData,
      submittedAt: new Date().toISOString(),
      isNew: true,
    } as SubmitedData;

    dispatch(addSubmission(submission));
    console.log(store.getState());
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
