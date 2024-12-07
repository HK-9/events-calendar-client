import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { signupSchema } from './signup.schema';

// Define the signup schema for validation

const SignupForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Form submission handler
  const onSubmit = (data: { email: string; password: string; confirmPassword: string }) => {
    console.log('Form Data:', data);
    // Handle signup logic here (e.g., API call)
    navigate('/dashboard'); // Navigate to dashboard after successful signup
  };

  return (
    <Paper className="p-8 shadow-lg rounded-xl max-w-sm mx-auto mt-16">
      <Typography variant="h5" className="text-center mx-6 mb-3 font-semibold">
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="space-y-4">
          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
                required
                className="rounded-md"
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                variant="outlined"
                required
                className="rounded-md"
              />
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                type="password"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                variant="outlined"
                required
                className="rounded-md"
              />
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4 py-2"
          >
            Sign Up
          </Button>
        </Box>
      </form>

      {/* Login Link */}
      <Box className="mt-4 text-center">
        <Typography variant="body2" className="text-gray-600">
          Already have an account?{' '}
          <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => navigate('/login')}>
            Login
          </span>
        </Typography>
      </Box>
    </Paper>
  );
};

export default SignupForm;
