import type { SubmitedData } from '../../store/submissionsSlice';
import './SubmissionCard.css';

const SubmissionCard = ({ submission }: { submission: SubmitedData }) => {
  return (
    <div className="submission-card">
      <h3>{submission.name}</h3>
      <p>
        Age: <span>{submission.age}</span>
      </p>
      <p>
        Email: <span>{submission.email}</span>
      </p>
      <p>
        Gender: <span>{submission.gender}</span>
      </p>
      <p>
        Terms Accepted: <span>{submission.termsAccepted ? 'Yes' : 'No'}</span>
      </p>
    </div>
  );
};

export default SubmissionCard;
