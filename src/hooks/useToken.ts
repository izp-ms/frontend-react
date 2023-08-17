import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    console.log(tokenString);
    return tokenString;
    // const userToken = JSON.parse(tokenString);
    // return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    console.log(userToken);
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
