import { useForm } from 'react-hook-form';
import {
  addSubmission,
  type SubmitedData,
} from '../../../store/submissionsSlice';
import { store } from '../../../store/store';
import { useAppDispatch } from '../../../store/hooks';

const RHForm = () => {
  const { register, handleSubmit } = useForm<SubmitedData>();
  const dispatch = useAppDispatch();

  const onSubmit = (rawData: Omit<SubmitedData, 'submittedAt' | 'isNew'>) => {
    const submission = {
      ...rawData,
      submittedAt: new Date().toISOString(),
      isNew: true,
    };

    dispatch(addSubmission(submission));
    console.log(store.getState());
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
        <input type="radio" id="male" value="male" {...register('gender')} />
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          id="female"
          value="female"
          {...register('gender')}
        />
        <label htmlFor="female">Female</label>
      </div>
      <div className="form-group">
        <label htmlFor="termsAccepted">
          <input
            id="termsAccepted"
            type="checkbox"
            {...register('termsAccepted')}
          />
          I accept Terms & Conditions
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RHForm;
