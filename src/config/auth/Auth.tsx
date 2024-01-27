import React, { createContext, useEffect, useRef, useState } from "react";
import Keycloak, { KeycloakInitOptions } from "keycloak-js";
import { AuthContextType, AuthProviderProps } from "./Auth.interface";
import LocalStorageHelper from "../../helpers/LocalStorageHelper";
import { AUTH_TOKEN } from "../../utils/constants";

const keycloakSetting = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
};

const initOptions: KeycloakInitOptions = {
  onLoad: "login-required",
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const isRun = useRef(false);
  const [authInstance, setAuthInstance] = useState<Keycloak | null>(null);
  const [isAuthFailed, setIsAuthFailed] = useState(false);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;
    const keycloakInstance = new Keycloak(keycloakSetting);

    keycloakInstance.init(initOptions).then(
      (auth) => {
        if (!auth) {
          setIsAuthFailed(isAuthFailed);
        } else {
          console.info("Authenticated");
          console.log("auth", auth);
          console.log("Keycloak", keycloakInstance);
          console.log("Access Token", keycloakInstance.token);

          keycloakInstance.onTokenExpired = () => {
            console.log("token expired");
            keycloakInstance
              .updateToken(5) // Specify a buffer time (in seconds) to refresh before expiration
              .then((refreshed) => {
                if (refreshed) {
                  console.log("Token refreshed");
                } else {
                  console.error("Token refresh failed, redirecting to login");
                  window.location.reload();
                }
              })
              .catch((error) => {
                console.error("Error refreshing token:", error);
                window.location.reload();
              });
          };

          setAuthInstance(keycloakInstance);
        }
      },
      () => {
        console.error("Authentication Failed");
      }
    );
  }, []);

  useEffect(() => {
    if (authInstance && authInstance.token) {
      LocalStorageHelper.setItem(AUTH_TOKEN, authInstance.token);
    }
  }, [authInstance?.token]);

  return (
    <AuthContext.Provider value={{ authInstance, isAuthFailed }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
