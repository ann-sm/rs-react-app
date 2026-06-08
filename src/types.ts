export interface SubmitedData {
  name: string;
  age: number;
  email: string;
  gender: string;
  termsAccepted: boolean;
  image: string | null;
  password: string;
  confirmPassword: string;
  country: string;
}

export interface FormProps {
  onSuccess: () => void;
}
