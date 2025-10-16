import { useContext } from "react";
import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, login, signup, logout } = useAuthContext();
  return { user, login, signup, logout };
};
