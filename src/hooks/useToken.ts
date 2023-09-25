import { useState } from "react";

export const getTokenFromSessionStorage = (): string => {
  return sessionStorage.getItem("token") ?? "";
};

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
    sessionStorage.setItem("token", JSON.stringify(userToken).slice(1, -1));
    if (userToken && userToken.token) {
      setToken(userToken.token);
    }
  };

  return {
    setToken: saveToken,
    token,
  };
}
