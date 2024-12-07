import { useState } from "react";
import { ILoginForm } from "../types/auth";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import { useAlert } from "./use-message-bar.hook";
import { getCookie } from "../helpers/utils";

export const useAuthActions = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const showAlert = useAlert();

  const handleLogin = async (loginForm: ILoginForm) => {
    try {
      setLoading(true);
      const res = await api.post("/auth/login", loginForm);
      if (res.status === 200) {
        console.log("cookies:", document.cookie);
        const jwt = getCookie("jwt");
        console.log("jwt", jwt);
        navigate("/dashboard");
        showAlert("Login Successful", "success");
        console.log("response", res);
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

    return { loading };
  };

  return { handleLogin };
};
