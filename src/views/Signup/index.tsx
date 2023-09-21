// import React, { useState } from "react";
// import AuthService from "../services/auth.service";
// import { useNavigate } from "react-router-dom";
import "./Login.scss";
import img1 from '../../assets/Logo.png';
import img3 from '../../assets/brightness.png';
import img4 from '../../assets/Flag_of_Great_Britain.png';
import img5 from '../../assets/Flag_of_Poland.png';
import img8 from '../../assets/lang.png';
import img15 from '../../assets/account-circle.png';
export const Signup = () => {
  return (
    <div className="container">
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
        <img className="nav_logo_image__img" src={img15}/>
          <h1 className="login__h">Sign Up</h1>
          <form className="login_form" //onSubmit={handleSubmit}
          >

              <input className="login_form__input"
                type="text" 
                placeholder="Email" 
                //onChange={(e) => setUserName(e.target.value)} 
                />

              <input className="login_form__input"
                type="text"
                placeholder="Name"
                //onChange={(e) => setPassword(e.target.value)}
              />
              <input className="login_form__input"
                type="text"
                placeholder="Sex"
                //onChange={(e) => setPassword(e.target.value)}
              />
              <input className="login_form__input"
                type="date"
                placeholder="Birth Date"
                //onChange={(e) => setPassword(e.target.value)}
              />









              <input className="login_form__input"
                type="password"
                placeholder="Password"
                //onChange={(e) => setPassword(e.target.value)}
              />
            
              <input className="login_form__input"
                  type="password"
                  placeholder="Confirm password"
                  //onChange={(e) => setPassword(e.target.value)}
                />
            <div className="login_form_submit">
              <button className="login_form_submit_btn" type="submit">Sign Up</button>
            </div>
          </form>
          <p className="login__p">Have account already? <a className="login__a" href="./signin"> Sign in</a></p>
        </div>
      </div>
    </div>
  );
};
// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSignup = async (e: any) => {
//     e.preventDefault();
//     try {
//       await AuthService.signup(email, password).then(
//         (response: any) => {
//           // check for token and user already exists with 200
//           //   console.log("Sign up successfully", response);
//           navigate("/about");
//           window.location.reload();
//         },
//         (error: any) => {
//           console.log(error);
//         }
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSignup}>
//         <h3>Sign up</h3>
//         <input
//           type="text"
//           placeholder="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Sign up</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
