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
import { useEffect, useState } from "react";
import { Toast, ToastStatus } from "../../components/Toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Postcard } from "../../components/Postcard";
import { useGetPaginatedPostardQuery } from "../../services/postcard.service";
import BoxM from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { UserData } from "../../models/user";
export const Profile = () => {
  const user = useTypedSelector((state) => state.auth.user);

  const { data: userData, refetch } = useGetUserDataQuery(user?.id ?? "0");
  const { data: paginatedPostcardData, refetch:getInfo} = useGetPaginatedPostardQuery({
      pagination:{
        pageNumber: 1,
        pageSize: 10,
      },
      filters: {
        userId: Number(user?.id ?? "0"),
      },
    }
  );

  const [updateUserData] = useUpdateUserDataMutation();

  const [user123, setUser123] = useState<UserData|undefined>(undefined);
  
  useEffect(() => {
    console.log('xd');
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
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


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

      <div onClick={()=>{
        getInfo();
        console.log(paginatedPostcardData)
      }}>{paginatedPostcardData?.content.map(postcard =>{
         return <div>{postcard.title}</div>;
      })}
      </div>

      <Box className={styles.profile} sx={{ background: "background.paper" }}>
        <img
          src={`data:image/jpeg;base64,${user123?.backgroundBase64}`}
          alt="background"
          className={styles.background_image}
        />
        <div className={styles.avatar}>
          <Avatar
            className={styles.avatar_image}
            alt="Avatar"
            src={`data:image/jpeg;base64,${user123?.avatarBase64}`}
          />
          <Button onClick={handleOpen}>Edit Profile</Button>
          <span>user123{user123?.firstName}</span>
                  <span>values{values.firstName}</span>
          <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <BoxM sx={style}>
                
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
                  <TextField
                  variant="outlined"
                  value={values.country}
                  error={Boolean(errors.country && touched.country)}
                  onChange={(e) => setFieldValue("country", e.target.value)}
                />
                <TextField
                  variant="outlined"
                  value={values.city}
                  error={Boolean(errors.city && touched.city)}
                  onChange={(e) => setFieldValue("city", e.target.value)}
                />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={new Date(values.birthDate ?? 0) ?? new Date()}
                    onChange={(e) => e && setFieldValue("birthDate", e)}
                    format="dd.MM.yyyy"
                  />
                </LocalizationProvider>
                
                </div>
                <span className={styles.update} onClick={() =>{
                  handleUpdateUser();
                  setOpen(false);
                  refetch();
                }}>
                  <CheckIcon />
                  Update profile
                </span>
                </BoxM>
              </Modal>

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
              
                <>
                  {user123?.firstName ?? "-"} {user123?.lastName ?? "-"}
                </>
              
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_name}>Nickname:</span>
            <span className={styles.info_value}>
              {user123?.nickName ?? "-"}
            </span>
          </div>
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
        </div>

        <div className={styles.postcards_info}>
          <div className={styles.info}>
            <span className={styles.info_name}>Postcards received</span>
            <span className={styles.info_value}>
              {user123?.postcardsReceived ?? "-"}
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_name}>Postcards sent</span>
            <span className={styles.info_value}>
              {user123?.postcardsSent ?? "-"}
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_name}>Total score</span>
            <span className={styles.info_value}>{user123?.score ?? "-"}</span>
          </div>
        </div>
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
