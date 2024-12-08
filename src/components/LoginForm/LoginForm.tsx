import React from "react";
import { useForm, Controller } from "react-hook-form";
import { loginSchema } from "./login.schema"; // Assuming you have a login schema defined
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ILoginForm } from "../../types/auth";
import { useAuthActions } from "../../hooks/use-auth-actions.hook";

const LoginForm = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuthActions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: ILoginForm) => {
    console.log("Form Data:", data);
    handleLogin(data);
  };

  return (
    <div className="p-8 shadow-lg rounded-xl max-w-sm mx-auto my-16">
      <div className="flex justify-center">
        <span className="text-center mx-6 mb-3 font-semibold text-[28px]">
          Login
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="space-y-4">
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4 py-2"
          >
            Login
          </Button>
        </Box>
      </form>

      <Box className="mt-4 text-center">
        <Typography variant="body2" className="text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </Typography>
      </Box>
    </div>
  );
};

export default LoginForm;
