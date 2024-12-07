import * as yup from 'yup';

// Define the login schema for validation
export const signupSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address') 
      .required('Email is required'), 
  
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters') 
      .required('Password is required'), 
  
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'), 
  });