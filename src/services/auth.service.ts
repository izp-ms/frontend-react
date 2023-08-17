// import { useLoginMutation } from "./user.service";

export const API_URL = "/auth";

// // const register = (email: any, password: any) => {
// //   return axios
// //     .post(API_URL + "/signup", {
// //       email,
// //       password,
// //     })
// //     .then((response: any) => {
// //       if (response.data.accessToken) {
// //         localStorage.setItem("user", JSON.stringify(response.data));
// //       }

// //       return response.data;
// //     });
// // };

// const login = (email: any, password: any) => {
//   return axios
//     .post(API_URL + "/login", {
//       email,
//       password,
//     })
//     .then((response: any) => {
//       if (response.data.accessToken) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }

//       return response.data;
//     });
// };

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = (): any => {
  return JSON.parse(localStorage.getItem("user") || "");
};

// const authService = {
//   signup,
//   login,
//   logout,
//   getCurrentUser,
// };

// export default authService;
