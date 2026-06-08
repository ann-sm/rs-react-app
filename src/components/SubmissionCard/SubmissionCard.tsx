import { useEffect, useState } from 'react';
import type { SubmitedData } from '../../types';
import './SubmissionCard.css';

const SubmissionCard = ({ submission }: { submission: SubmitedData }) => {
  const [isNew, setIsNew] = useState(submission.isNew);

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setIsNew(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  return (
    <div className={`submission-card ${isNew ? 'new-submission' : ''}`}>
      {submission.image && (
        <div className="image-container">
          <img src={submission.image} alt="Image" />
        </div>
      )}
      <h3>{submission.name}</h3>
      <p>
        age: <span>{submission.age}</span>
      </p>
      <p>
        email: <span>{submission.email}</span>
      </p>
      <p>
        gender: <span>{submission.gender}</span>
      </p>
      <p>
        country: <span>{submission.country}</span>
      </p>
    </div>
  );
};

export default SubmissionCard;
