import { useState } from "react";
import "./Login.scss";
import { useLoginMutation } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { useTypedDispatch } from "../../store";
import { getCurrentUser } from "../../services/auth.service";
import { setUser } from "../../store/auth.slice";

import img1 from '../../assets/Logo.png';
import img3 from '../../assets/brightness.png';
import img4 from '../../assets/Flag_of_Great_Britain.png';
import img5 from '../../assets/Flag_of_Poland.png';
import img8 from '../../assets/lang.png';

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
    <div className="container2">
      <nav className="nav">
        <div className="nav_logo">
          <div className="nav_logo_image">
            <img className="nav_logo_image__img" src={img1}/>
          </div>
          <h1 className="nav_logo__h">postcardia</h1>
        </div>
        <div className="nav_menu">
          <a target="_blank" href="https://www.google.com/">
          <button className="nav_menu_color">
          
            <img className="nav_menu_color__img" src={img3}/>
          
          </button>
          </a>
          <button className="nav_menu_lang">
            <img className="nav_menu_lang__img" src={img8}/>
          </button>
        </div>
        
      </nav>

      <div className="login">
        <div className="login_wrapper">
          <h1 className="login__h">Sign In</h1>
          <form className="login_form" onSubmit={handleSubmit}>

              <input className="login_form__input"
                type="text" 
                placeholder="Email" 
                onChange={(e) => setUserName(e.target.value)} />
            
              <input className="login_form__input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            
            <div className="login_form_submit">
              <button className="login_form_submit_btn" type="submit">Sign In</button>
            </div>
          </form>
          <p className="login__p">Dont have account yet? <a className="login__a" href="./signup"> Sign up</a></p>
        </div>
      </div>
    </div>
  );
}
