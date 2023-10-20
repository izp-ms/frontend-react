import "./styles.module.scss";
import { useTypedSelector } from "../../store";
import {
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} from "../../services/user.service";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CakeIcon from "@mui/icons-material/Cake";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { Avatar, Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import styles from "./styles.module.scss";
import { format } from "date-fns";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Toast, ToastStatus } from "../../components/Toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Postcard } from "../../components/Postcard";
import { useGetPaginatedPostardQuery } from "../../services/postcard.service";

export const Profile = () => {
  const user = useTypedSelector((state) => state.auth.user);

  const { data: userData, refetch } = useGetUserDataQuery(user?.id ?? "0");
  const { data: paginatedPostcardData, refetch:dupa} = useGetPaginatedPostardQuery({
      filters:{
        userId:1024
      },
      pagination:{
        pageSize:1,
        pageNumber:10
      }
    }
  );
  
  const [updateUserData] = useUpdateUserDataMutation();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [toastStatus, setToastStatus] = useState<ToastStatus>("none");
  const [toastSuccessMessage] = useState<string>("User updated successfully");
  const [toastErrorMessage, setToastErrorMessage] = useState<string>(
    "Something went wrong"
  );

  const initialValue = {
    id: user?.id ?? "0",
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    nickName: userData?.nickName,
    country: userData?.country,
    city: userData?.city,
    birthDate: userData?.birthDate,
    avatarBase64: userData?.avatarBase64,
    backgroundBase64: userData?.backgroundBase64,
    description: userData?.description,
  };

  const userSchema = Yup.object().shape({
    id: Yup.string().required("Id is required"),
    nickName: Yup.string().required("Nickname is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    birthDate: Yup.string().required("Birth date is required"),
    avatarBase64: Yup.string().required("Avatar is required"),
    backgroundBase64: Yup.string().required("Background is required"),
    description: Yup.string().required("Description is required"),
  });

  const { values, errors, touched, setFieldValue, submitForm } = useFormik({
    initialValues: initialValue,
    validationSchema: userSchema,
    onSubmit: async (values) => {
      updateUserData(values)
        .then((response: any) => {
          if (response.error) {
            setToastStatus("error");
            setToastErrorMessage(
              response.error.data.message ?? "Something went wrong"
            );
            return null;
          }
          setToastStatus("success");
          refetch();
        })
        .catch((e: { message: any }) => {
          setToastStatus("error");
          setToastErrorMessage(e.message ?? "Something went wrong");
        });
    },
    enableReinitialize: true,
  });

  const handleUpdateUser = async (): Promise<void> => {
    submitForm();
  };

  return (
    <Box className={styles.container} sx={{ color: "text.primary" }}>

      <div onClick={()=>{
        dupa();
        console.log(paginatedPostcardData)
      }}>{paginatedPostcardData?.content.map(postcard =>{
         return <div>{postcard.title}</div>;
      })}</div>

      <Box className={styles.profile} sx={{ background: "background.paper" }}>
        <img
          src={`data:image/jpeg;base64,${userData?.backgroundBase64}`}
          alt="background"
          className={styles.background_image}
        />
        <div className={styles.avatar}>
          <Avatar
            className={styles.avatar_image}
            alt="Avatar"
            src={`data:image/jpeg;base64,${userData?.avatarBase64}`}
          />
          <div>
            {!isEdit ? (
              <span
                className={styles.edit_profile}
                onClick={() => setIsEdit(true)}
              >
                <EditIcon />
                <span>Edit profile</span>
              </span>
            ) : (
              <span
                className={styles.edit_profile}
                onClick={() => setIsEdit(false)}
              >
                <span className={styles.cancel}>
                  <ClearIcon />
                  Cancel
                </span>
                <span className={styles.update} onClick={handleUpdateUser}>
                  <CheckIcon />
                  Update profile
                </span>
              </span>
            )}
          </div>
        </div>

        <div className={styles.profile_info}>
          <div className={styles.info}>
            <span className={styles.info_name}>
              {!isEdit ? (
                <>
                  {userData?.firstName ?? "-"} {userData?.lastName ?? "-"}
                </>
              ) : (
                <div className={styles.fullName}>
                  <TextField
                    variant="outlined"
                    value={values.firstName}
                    error={Boolean(errors.firstName && touched.firstName)}
                    onChange={(e) => setFieldValue("firstName", e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    value={values.lastName}
                    error={Boolean(errors.lastName && touched.lastName)}
                    onChange={(e) => setFieldValue("lastName", e.target.value)}
                  />
                </div>
              )}
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_name}>Nickname:</span>
            <span className={styles.info_value}>
              {userData?.nickName ?? "-"}
            </span>
          </div>
          <div className={styles.bio}>
            <div className={styles.country}>
              <FlagIcon />
              {!isEdit ? (
                <span>{userData?.country ?? "-"}</span>
              ) : (
                <TextField
                  variant="outlined"
                  value={values.country}
                  error={Boolean(errors.country && touched.country)}
                  onChange={(e) => setFieldValue("country", e.target.value)}
                />
              )}
            </div>
            <div className={styles.city}>
              <LocationCityIcon />
              {!isEdit ? (
                <span>{userData?.city ?? "-"}</span>
              ) : (
                <TextField
                  variant="outlined"
                  value={values.city}
                  error={Boolean(errors.city && touched.city)}
                  onChange={(e) => setFieldValue("city", e.target.value)}
                />
              )}
            </div>
            <div className={styles.birth_date}>
              <CakeIcon />
              {!isEdit ? (
                <span>
                  {userData?.birthDate
                    ? format(new Date(userData.birthDate), "dd.MM.yyyy")
                    : "-"}
                </span>
              ) : (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={new Date(values.birthDate ?? 0) ?? new Date()}
                    onChange={(e) => e && setFieldValue("birthDate", e)}
                    format="dd.MM.yyyy"
                  />
                </LocalizationProvider>
              )}
            </div>
          </div>
        </div>

        <div className={styles.postcards_info}>
          <div className={styles.info}>
            <span className={styles.info_name}>Postcards received</span>
            <span className={styles.info_value}>
              {userData?.postcardsReceived ?? "-"}
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_name}>Postcards sent</span>
            <span className={styles.info_value}>
              {userData?.postcardsSent ?? "-"}
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_name}>Total score</span>
            <span className={styles.info_value}>{userData?.score ?? "-"}</span>
          </div>
        </div>
      </Box>
      <Postcard />
      <Toast
        toastStatus={toastStatus}
        successMessage={toastSuccessMessage}
        errorMessage={toastErrorMessage}
        handleToastClose={() => setToastStatus("none")}
      />
    </Box>
  );
};
