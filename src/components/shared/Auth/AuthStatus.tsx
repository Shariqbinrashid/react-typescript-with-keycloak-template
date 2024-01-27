// AuthStatus.tsx
import React from "react";
import { CircularProgress } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

const AuthStatus: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authInstance, isAuthFailed } = useAuth();

  if (isAuthFailed) {
    return <>Something Went Wrong! Please refresh</>;
  }

  if (authInstance === null) {
    return <CircularProgress />;
  }

  if (authInstance.authenticated === true) {
    return <>{children}</>;
  } else {
    return <>Token Expired</>;
  }
};

export default AuthStatus;
