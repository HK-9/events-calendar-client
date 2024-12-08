import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import { useAlert } from "./use-message-bar.hook";
import { useAppContext } from "../context/AppContex";

export const useLogout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { setIsAuthenticated } = useAppContext();
  const showAlert = useAlert();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await api.post("/auth/logout");
      if (res.status === 200 || res.status === 201) {
        navigate("/");
        showAlert("Logged out successfully", "success");
        setIsAuthenticated(false);
      }
    } catch (error: any) {
      console.error(error);
      if (error.isAxiosError) {
        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          "Something went wrong.";

        const errorSeverity: "error" | "warning" =
          error.response?.status === 404 ? "warning" : "error";

        showAlert(errorMessage, errorSeverity);
      } else {
        showAlert("An unexpected error occurred.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleLogout };
};
