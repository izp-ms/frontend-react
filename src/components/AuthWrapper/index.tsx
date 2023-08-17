import { ReactElement, useEffect, useState } from "react";
import { useLoginMutation } from "../../services/user.service";

type Props = {
  children: ReactElement;
};

export const AuthWrapper = (props: Props) => {
  const { children } = props;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, { isSuccess, isError }] = useLoginMutation();

  useEffect(() => {
    login({ email: "admin2@email.com2", password: "string123" }).then(
      (response: any) => {
        console.log(response);
        if (!response.error) {
          setIsLoggedIn(true);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      }
    );
  }, [login]);

  if (!isLoggedIn) {
    return null;
  }

  return children;
};
