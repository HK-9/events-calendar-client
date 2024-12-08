import { useState } from "react";
import { IUser } from "../types/auth";
import api from "../axios";

export const useGetUser = () => {
  const [userData, setUserData] = useState<IUser | undefined | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/get-user-details");
      if (res.status === 200 || 201) {
        setUserData(res.data?.user);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { userData, loading, getUserDetails };
};
