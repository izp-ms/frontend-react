import { useState } from "react";
import { useLoginMutation } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { useTypedDispatch } from "../../store";
import { getCurrentUser } from "../../services/auth.service";
import { setUser } from "../../store/auth.slice";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import styles from "./styles.module.scss";
import {
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { StyledButton } from "../../components/StyledButton";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast, ToastStatus } from "../../components/Toast";

export default function Login() {
  const { setToken } = useToken();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [toastStatus, setToastStatus] = useState<ToastStatus>("none");
  const [toastErrorMessage, setToastErrorMessage] = useState(
    "Something went wrong"
  );

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const initialValue = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const { values, errors, touched, setFieldValue, submitForm } = useFormik({
    initialValues: initialValue,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      login({ email: email, password: password })
        .then((response: any) => {
          if (response.error) {
            setToastStatus("error");
            setToastErrorMessage(
              response.error.data.message ?? "Something went wrong"
            );
            return null;
          }
          setToken(response.data.token);
          const user = getCurrentUser();
          dispatch(setUser(user));
          navigate("/profile");
          setToken(response.data.token);
        })
        .catch((e) => {
          setToastStatus("error");
          setToastErrorMessage(e.message ?? "Something went wrong");
        });
    },
    enableReinitialize: true,
  });

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={submitForm}>
          <FormGroup>
            <TextField
              value={values.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
              placeholder="E-mail"
              error={Boolean(errors.email && touched.email)}
              InputProps={{
                startAdornment: <AlternateEmailIcon color="secondary" />,
              }}
            />
            <InputLabel sx={{ color: "red" }}>
              {errors.email ?? null}
            </InputLabel>
          </FormGroup>
          <FormGroup>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              startAdornment={<LockPersonIcon />}
              placeholder="Password"
              value={values.password}
              onChange={(e) => setFieldValue("password", e.target.value)}
              error={Boolean(errors.password && touched.password)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(true)}
                    onMouseDown={() => setShowPassword(false)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <InputLabel sx={{ color: "red" }} htmlFor="password">
              {errors.password ?? null}
            </InputLabel>
          </FormGroup>
          <StyledButton
            content="Login"
            onClick={async () => {
              console.log(values);
              await submitForm();
            }}
          />
          <div>
            Not a member?
            <span
              className={styles.signin}
              onClick={() => navigate("/register")}
            >
              Sign up now
            </span>
          </div>
        </form>
      </div>
      <Toast
        toastStatus={toastStatus}
        errorMessage={toastErrorMessage}
        handleToastClose={() => setToastStatus("none")}
      />
    </div>
  );
}
