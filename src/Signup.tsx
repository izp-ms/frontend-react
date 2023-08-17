// import React, { useState } from "react";
// import AuthService from "../services/auth.service";
// import { useNavigate } from "react-router-dom";
export const Signup = () => {
  return <h1>xd</h1>;
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
