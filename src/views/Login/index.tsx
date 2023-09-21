import { useState } from "react";
import { useLoginMutation } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { useTypedDispatch } from "../../store";
import { getCurrentUser } from "../../services/auth.service";
import { setUser } from "../../store/auth.slice";

import styles from "./styles.module.scss";

export default function Login() {
  const { setToken } = useToken();
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const loginUser = async (credentials: any): Promise<void> => {
    login({ email: "admin2@email.com", password: "string123" })
      .then((response: any) => {
        console.log(response);
        if (response.error) {
          return null;
        }
        setToken(response.data.token);
        const user = getCurrentUser();
        dispatch(setUser(user));
        navigate("/profile");

        setToken(response.data.token);
      })
      .catch(() => {
        console.log("error");
      });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await loginUser({
      username,
      password,
    });
  };

  return (
    <div className={styles.container}>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
