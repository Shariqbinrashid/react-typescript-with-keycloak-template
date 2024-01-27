import { useContext } from "react";
import { AuthContext } from "../config/auth/Auth";
import { AuthContextType } from "../config/auth/Auth.interface";

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
