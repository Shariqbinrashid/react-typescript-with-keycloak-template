import { ReactNode } from "react";
import Keycloak from "keycloak-js";

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  authInstance: Keycloak | null;
  isAuthFailed: boolean
}
