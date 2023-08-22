import { useState } from "react";
// import "./Login.scss";
import { useLoginMutation } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { useTypedDispatch } from "../../store";
import { getCurrentUser } from "../../services/auth.service";
import { setUser } from "../../store/auth.slice";

export default function Login() {
  const { setToken } = useToken();
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [login, { isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  async function loginUser(credentials: any) {
    login({ email: "admin2@email.com", password: "string123" }).then(
      (response: any) => {
        console.log(response);
        if (response.error) {
          return null;
        }
        setToken(response.data.token);
        const user = getCurrentUser();
        console.log(user);
        dispatch(setUser(user));
        return response.data.token;
      }
    );
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    console.log(token);
    navigate("/home");
    setToken(token);
  };

  return (
    <div className="login-wrapper">
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
