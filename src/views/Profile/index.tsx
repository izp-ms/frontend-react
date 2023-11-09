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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar, Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import styles from "./styles.module.scss";
import { format } from "date-fns";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Toast, ToastStatus } from "../../components/Toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import background from '../../assets/png/default-background.png';
import profile from '../../assets/png/default-profile.png';
import BoxM from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { UserData } from "../../models/user";
import { MyPostcards } from "../Postcard/components/MyPostcards";
import { useGetFavoritePostcardsQuery, useGetPostcardsQuery } from "../../services/postcard.service";
import { PostcardCard } from "../../components/PostcardCard";
import ImageBlob from "../../components/Base64Converter";
import { getTokenFromSessionStorage } from "../../hooks/useToken";
export const Profile = () => {
  const user = useTypedSelector((state) => state.auth.user);

  const { data: userData, refetch } = useGetUserDataQuery(user?.id ?? "0");
  

  const [updateUserData] = useUpdateUserDataMutation();

  const [user123, setUser123] = useState<UserData|undefined>(undefined);
  
  useEffect(() => {
    console.log(getTokenFromSessionStorage());
    // if (!userData) {
    //   return;
    // }
    setUser123(userData);
  }, [user123,userData,refetch]); 

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [toastStatus, setToastStatus] = useState<ToastStatus>("none");
  const [toastSuccessMessage] = useState<string>("User updated successfully");
  const [toastErrorMessage, setToastErrorMessage] = useState<string>(
    "Something went wrong"
  );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
  const { data: favoritePostcards, refetch:favorite} = useGetFavoritePostcardsQuery(user?.id ?? "0");
  
  const initialValue = {
    id: user?.id ?? "0",
    firstName: user123?.firstName,
    lastName: user123?.lastName,
    nickName: user123?.nickName,
    country: user123?.country,
    city: user123?.city,
    birthDate: user123?.birthDate,
    avatarBase64: user123?.avatarBase64,
    backgroundBase64: user123?.backgroundBase64,
    description: user123?.description,
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
      await updateUserData(values)
        .then((response: any) => {
          console.log(response);
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
          console.log(e);
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
      <Box className={styles.profile} sx={{ background: "background.paper" }}
      onClick={() => {console.log(getTokenFromSessionStorage())}}
      >
        <div onClick={() => {refetch()}} >cos dla ciebie</div>
        {user123?.backgroundBase64 ?(
          <img
          src={`data:image/jpeg;base64,${user123?.backgroundBase64}`}
          alt="background"
          className={styles.background_image}
          />
        ):(
          <img
          src={background}
          alt="background"
          className={styles.background_image}
          />
        )}
        <div className={styles.avatar}>
          <Box className={styles.avatar_back} sx={{ background: "background.paper" }}>
            {user123?.avatarBase64 ?(
              <Avatar
                className={styles.avatar_image}
                alt="Avatar"
                src={`data:image/jpeg;base64,${user123?.avatarBase64}`}
              />
            ):(
              <Avatar
                className={styles.avatar_image}
                alt="Avatar"
                src={profile}
              />
            )}
          </Box>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <BoxM sx={style}>
                {/* <div className={styles.container}>
                  {imgs ?(
                    <img src={imgs} className={styles.img} />
                  ):(
                    <div  className={styles.img} />
                  )}
                  <label className={styles.custom_file_upload}>
                    <input type="file" accept="image/png, image/jpeg" onChange={handleChange} />
                    Pick photo
                  </label> */}




              <ImageBlob/>
              <ImageBlob/>
                <div className={styles.fullName}>
                <span className={styles.firstname}>Firstname</span>
                  <TextField
                    className={styles.form_input}
                    variant="outlined"
                    value={values.firstName}
                    error={Boolean(errors.firstName && touched.firstName)}
                    onChange={(e) => setFieldValue("firstName", e.target.value)}
                  />
                  <TextField
                    className={styles.form_input}
                    variant="outlined"
                    value={values.lastName}
                    error={Boolean(errors.lastName && touched.lastName)}
                    onChange={(e) => setFieldValue("lastName", e.target.value)}
                  />
                  <TextField
                    className={styles.form_input}
                    variant="outlined"
                    value={values.country}
                    error={Boolean(errors.country && touched.country)}
                    onChange={(e) => setFieldValue("country", e.target.value)}
                  />
                  <TextField
                    className={styles.form_input}
                    variant="outlined"
                    value={values.city}
                    error={Boolean(errors.city && touched.city)}
                    onChange={(e) => setFieldValue("city", e.target.value)}
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      className={styles.form_input}
                      value={new Date(values.birthDate ?? 0) ?? new Date()}
                      onChange={(e) => e && setFieldValue("birthDate", e)}
                      format="dd.MM.yyyy"
                    />
                  </LocalizationProvider>
                </div>
                <span className={styles.update} onClick={() =>{
                  handleUpdateUser();
                  setOpen(false);
                  favorite();
                }}>
                  <Button variant="contained">
                    <CheckIcon />
                    Update profile
                  </Button>
                </span>
              </BoxM>
            </Modal>
            <span
              className={styles.edit_profile}
              onClick={handleOpen}
            >
              <EditIcon />
              <span>Edit profile</span>
            </span>
          </div>
        </div>

        <div className={styles.profile_info}>
          <div className={styles.info}>
            {/* <span className={styles.info_name}>Nickname:</span> */}
            <span className={styles.info_value}>
              {user123?.nickName ?? "-"}
            </span>
          </div>

          <div className={styles.info}>
            <span className={styles.info_name}>
              
                <>
                  {user123?.firstName ?? "-"} {user123?.lastName ?? "-"}
                </>
              
            </span>
          </div>
        </div>

        <div className={styles.postcards_info}>
          <div className={styles.info}>
            <span className={styles.info_name}>Score</span>
            <span className={styles.info_value}>
              {user123?.postcardsReceived ?? "-"}
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_name}>Followers</span>
            <span className={styles.info_value}>
              {user123?.postcardsSent ?? "-"}
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_name}>Following</span>
            <span className={styles.info_value}>{user123?.score ?? "-"}</span>
          </div>
        </div>
        <div className="questions_content">
          <button type="button" className="questions_content_expandable">
            <KeyboardArrowDownIcon/>
            <h2 className="questions_content_expandable__h2">About me</h2>
          </button>
          <div className="questions_content_text">
          <div className={styles.bio}>
            <div className={styles.country}>
              <FlagIcon />
              
                <span>{user123?.country ?? "-"}</span>
              
            </div>
            <div className={styles.city}>
              <LocationCityIcon />
              
                <span>{user123?.city ?? "-"}</span>
              
            </div>
            <div className={styles.birth_date}>
              <CakeIcon />
              
                <span>
                  {user123?.birthDate
                    ? format(new Date(user123.birthDate), "dd.MM.yyyy")
                    : "-"}
                </span>
            </div>
          </div>
            <span className="questions_content_text__p">{user123?.description ?? "-"}</span>
          </div>
        </div>
      </Box>

      <Box className={styles.favorites}>

      {
        favoritePostcards?.map((postcard) => (
          <div className={styles.wrapper}><PostcardCard postcard={postcard} /></div>
        ))
      }
      </Box>
      
      




      <Toast
        toastStatus={toastStatus}
        successMessage={toastSuccessMessage}
        errorMessage={toastErrorMessage}
        handleToastClose={() => setToastStatus("none")}
      />
    </Box>
  );
};
