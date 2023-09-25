import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormGroup,
  InputLabel,
} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import PersonIcon from "@mui/icons-material/Person";
import { StyledButton } from "../../components/StyledButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Toast, ToastStatus } from "../../components/Toast";
import { useRegisterMutation } from "../../services/user.service";

export const Register = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const handleMoveToLoginView = (): void => {
    navigate("/login");
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [toastStatus, setToastStatus] = useState<ToastStatus>("none");
  const [toastErrorMessage, setToastErrorMessage] = useState(
    "Something went wrong"
  );
  const [toastSuccessMessage] = useState<string>(
    "Account created successfully"
  );

  const initialValue = {
    email: "",
    nickName: "",
    password: "",
    confirmPassword: "",
  };

  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    nickName: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .when("password", (password, schema) => {
        return schema.test({
          name: "confirmPassword",
          exclusive: true,
          message: "Confirm password must be the same as password",
          test: (confirmPassword: string) => {
            if (confirmPassword === password[0]) {
              return true;
            }
            return false;
          },
        });
      }),
  });

  const { values, errors, touched, setFieldValue, submitForm } = useFormik({
    initialValues: initialValue,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const { email, nickName, password, confirmPassword } = values;

      if (password !== confirmPassword) {
        setToastStatus("error");
        setToastErrorMessage("Password and confirm password must be the same");
        return;
      }

      register({
        email: email,
        nickName: nickName,
        password: password,
        confirmPassword: confirmPassword,
      })
        .then((response: any) => {
          if (response.error) {
            setToastStatus("error");
            setToastErrorMessage(
              response.error.data.message ?? "Something went wrong"
            );
            return null;
          }
          setToastStatus("success");

          navigate("/login");
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
      <div className={styles.register}>
        <h1>Register</h1>
        <form className={styles.form}>
          <FormGroup>
            <TextField
              value={values.nickName}
              onChange={(e) => setFieldValue("nickName", e.target.value)}
              placeholder="NickName"
              error={Boolean(errors.nickName && touched.nickName)}
              InputProps={{
                startAdornment: <PersonIcon color="secondary" />,
              }}
            />
            <InputLabel sx={{ color: "red" }}>
              {errors.nickName ?? null}
            </InputLabel>
          </FormGroup>
          <FormGroup>
            <TextField
              value={values.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
              placeholder="E-mail"
              error={Boolean(errors.email && touched.email)}
              InputProps={{
                startAdornment: <AlternateEmailIcon color="secondary" />,
              }}
            />{" "}
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
            />{" "}
            <InputLabel sx={{ color: "red" }}>
              {errors.password ?? null}
            </InputLabel>
          </FormGroup>
          <FormGroup>
            <OutlinedInput
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              startAdornment={<LockPersonIcon />}
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
              error={Boolean(errors.confirmPassword && touched.confirmPassword)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(true)}
                    onMouseDown={() => setShowConfirmPassword(false)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />{" "}
            <InputLabel sx={{ color: "red" }}>
              {errors.confirmPassword ?? null}
            </InputLabel>
          </FormGroup>
          <StyledButton
            content="Register"
            onClick={async () => {
              await submitForm();
            }}
          />
        </form>
        <div>
          Already have an account?
          <span className={styles.signup} onClick={handleMoveToLoginView}>
            Login
          </span>
        </div>
      </div>
      <Toast
        toastStatus={toastStatus}
        successMessage={toastSuccessMessage}
        errorMessage={toastErrorMessage}
        handleToastClose={() => setToastStatus("none")}
      />
    </div>
  );
};
