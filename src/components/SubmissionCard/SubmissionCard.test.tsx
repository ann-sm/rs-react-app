import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubmissionCard from './SubmissionCard';

describe('SubmissionCard', () => {
  const mockSubmission = {
    name: 'John Doe',
    age: 25,
    email: 'john@example.com',
    gender: 'male',
    termsAccepted: true,
    image: 'data:image/png;base64,test',
    password: 'password123',
    confirmPassword: 'password123',
    country: 'Germany',
    isNew: true,
  };

  // const findTextAcrossElements = (text: string, value: string | number) => {
  //   return screen.getByText((content) => {
  //     return content.includes(text) && content.includes(String(value));
  //   });
  // };

  // it('should render submission data', () => {
  //   render(<SubmissionCard submission={mockSubmission} />);

  //   expect(screen.getByText('John Doe')).toBeInTheDocument();
  //   expect(findTextAcrossElements('age:', 25)).toBeInTheDocument();
  //   expect(findTextAcrossElements('email:', 'john@example.com')).toBeInTheDocument();
  //   expect(findTextAcrossElements('gender:', 'male')).toBeInTheDocument();
  //   expect(findTextAcrossElements('country:', 'Germany')).toBeInTheDocument();
  // });

  it('should show image when provided', () => {
    render(<SubmissionCard submission={mockSubmission} />);

    const image = screen.getByAltText('Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockSubmission.image);
  });

  it('should add new-submission class when isNew is true', () => {
    const { container } = render(
      <SubmissionCard submission={mockSubmission} />
    );
    const card = container.firstChild;
    expect(card).toHaveClass('new-submission');
  });

  it('should not show image when image is null', () => {
    const submission = { ...mockSubmission, image: null };
    render(<SubmissionCard submission={submission} />);

    const image = screen.queryByAltText('Image');
    expect(image).not.toBeInTheDocument();
  });
});
