import React, { useState } from "react";
import { useAlert } from "./use-message-bar.hook";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import { IEventData } from "../types/forms";

const useGetCalendarEvents = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [res, setRes] = useState<unknown>();
  const showAlert = useAlert();

  const handleCreateEvent = async (loginForm: IEventData) => {
    try {
      setLoading(true);
      const res = await api.post("/events/create-event", loginForm);
      if (res.status === 200 || 201) {
        navigate("/dashboard");
        setRes(res.data);
        showAlert("Event Created", "success");
        //?a proper query re-fetch needs to be established, but this approach was taken due to time limitations.
        window.location.reload();
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

  return { handleCreateEvent, loading };
};
export default useGetCalendarEvents;
