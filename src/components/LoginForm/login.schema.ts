import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address') // Ensures the email is in a valid format
    .required('Email is required'),  // Ensures the email field is not empty

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters') // Minimum length of 6 characters for password
    .required('Password is required'), // Ensures the password field is not empty
});
