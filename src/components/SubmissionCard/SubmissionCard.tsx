import type { SubmitedData } from '../../types';
import './SubmissionCard.css';

const SubmissionCard = ({ submission }: { submission: SubmitedData }) => {
  return (
    <div className="submission-card">
      {submission.image && (
        <div className="image-container">
          <img src={submission.image} alt="Image" />
        </div>
      )}
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
        Country: <span>{submission.country}</span>
      </p>
    </div>
  );
};

export default SubmissionCard;
