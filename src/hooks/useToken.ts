import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    if (userToken && userToken.token) {
      setToken(userToken.token);
    }
  };

  return {
    setToken: saveToken,
    token,
  };
}
