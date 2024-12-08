import { useState, useCallback, useMemo } from "react";
import { useAlert } from "./use-message-bar.hook";
import api from "../axios"; // Adjust the API import as needed
import { IDBEventData } from "../types/forms";

const useGetCalendarEvents = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<IDBEventData[]>([]);
  const showAlert = useAlert();

  const getMyEvents = useCallback(async () => {
    try {
      setLoading(true); // Start loading
      const res = await api.get("/events/get-all-event");
      if (res.status === 200 || res.status === 201) {
        const fetchedEvents = res.data.events;
        setResponse(fetchedEvents);
      } else {
        showAlert("Failed to fetch events", "error");
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong.";
      const errorSeverity: "error" | "warning" =
        error.response?.status === 404 ? "warning" : "error";
      showAlert(errorMessage, errorSeverity);
    } finally {
      setLoading(false); // End loading
    }
  }, [showAlert]);

  const data = useMemo(() => {
    return response.map((e) => ({
      name: e.name,
      startDate: new Date(e.startDate),
      endDate: new Date(e.endDate),
    }));
  }, [response]);

  return { getMyEvents, data, loading };
};

export default useGetCalendarEvents;
