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
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from '@mui/icons-material/Close';
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
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { UserData } from "../../models/user";
import { useGetFavoritePostcardsQuery, useGetPostcardsQuery } from "../../services/postcard.service";
import { PostcardCard } from "../../components/PostcardCard";
import ImageBlob from "../../components/Base64Converter";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CountrySelect from "../../components/TextFieldCountry";
import FavoritePostcards from "../../components/FavoritePostcard";


export const Profile = () => {
  const user = useTypedSelector((state) => state.auth.user);

  const { data: userData, refetch } = useGetUserDataQuery(user?.id ?? "0");
  

  const [updateUserData] = useUpdateUserDataMutation();

  const [user123, setUser123] = useState<UserData|undefined>(undefined);
  
  useEffect(() => {
    //console.log(getTokenFromSessionStorage());
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


  const [isOpenModalFavorite, setIsOpenModalFavorite] = useState(false)
  const handleOpenFavorite = () => setIsOpenModalFavorite(true);
  const handleCloseFavorite = () => setIsOpenModalFavorite(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);
  const style1 = {
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
  const style2 = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
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

      <Box className={styles.profile} sx={{ background: "background.paper" }}>
        {user123?.backgroundBase64 ?(
          <img
          src={`data:image/jpeg;base64,${user123?.backgroundBase64}`}
          alt="background"
          className={`${styles.background_image} ${styles.no_draggable}`}
          />
        ):(
          <img
          src={background}
          alt="background"
          className={`${styles.background_image} ${styles.no_draggable}`}
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
              open={openProfile}
              onClose={handleCloseProfile}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <BoxM sx={style1} 
              className={styles.pop_up}>

                <span className={styles.close} onClick={() =>{
                  setOpenProfile(false);
                }}>
                    <CloseIcon />
                </span>


                {/* <ImageBlob/>
                <ImageBlob/> */}
                
                
                  <TextField
                    className={styles.form_input}
                    label="Firstname"
                    variant="outlined"
                    value={values.firstName}
                    error={Boolean(errors.firstName && touched.firstName)}
                    onChange={(e) => setFieldValue("firstName", e.target.value)}
                  />
                  <TextField
                    className={styles.form_input}
                    label="Lastname"
                    variant="outlined"
                    value={values.lastName}
                    error={Boolean(errors.lastName && touched.lastName)}
                    onChange={(e) => setFieldValue("lastName", e.target.value)}
                  />
                  <TextField
                    className={styles.form_input}
                    label="Country"
                    variant="outlined"
                    value={values.country}
                    error={Boolean(errors.country && touched.country)}
                    onChange={(e) => setFieldValue("country", e.target.value)}
                  />

                  {/* <CountrySelect/> */}
                  <TextField
                    className={styles.form_input}
                    label="City"
                    variant="outlined"
                    value={values.city}
                    error={Boolean(errors.city && touched.city)}
                    onChange={(e) => setFieldValue("city", e.target.value)}
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      className={styles.form_input}
                      label="Date of birth"
                      value={new Date(values.birthDate ?? 0) ?? new Date()}
                      onChange={(e) => e && setFieldValue("birthDate", e)}
                      format="dd.MM.yyyy"
                    />
                  </LocalizationProvider>
                
                <span className={styles.update} onClick={() =>{
                  handleUpdateUser();
                  setOpenProfile(false);
                  favorite();
                }}>
                  <Button 
                  variant="contained"
                  className={styles.btn}
                  >
                    <CheckIcon />
                    Save
                  </Button>
                </span>
              </BoxM>
            </Modal>
            <span
              className={styles.edit_profile}
              onClick={handleOpenProfile}
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
            <span className={styles.info_names}>
              
                <>
                  {user123?.firstName ?? "-"} {user123?.lastName ?? "-"}
                </>
              
            </span>
          </div>
        </div>

        
        <div
          className={styles.accordion_container}>
        <Accordion
          className={styles.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            
          >
            <Typography
              className={styles.about_me}
              >About me</Typography>
          </AccordionSummary>
          <AccordionDetails>

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
            <Typography>
            {user123?.description ?? "-"}
            </Typography>
          </AccordionDetails>
        </Accordion>
        </div>
        <div className={styles.postcards_info}>
          <div className={styles.info}>
            <span className={styles.info_name}>Received</span>
            <span className={styles.info_value}>
              {user123?.postcardsReceived ?? "-"}
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_name}>Sent</span>
            <span className={styles.info_value}>
              {user123?.postcardsSent ?? "-"}
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_name}>Score</span>
            <span className={styles.info_value}>{user123?.score ?? "-"}</span>
          </div>
        </div>
      </Box>

      <Box className={styles.favorites}>
      <span
        className={styles.edit_favorite}
        onClick={handleOpenFavorite}
      >
        <EditIcon />
        <span>Edit favorite</span>
      </span>
      
      <Modal
        open={isOpenModalFavorite}
        onClose={handleCloseFavorite}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxM sx={style2}>
          <span className={styles.close} onClick={() =>{
              setIsOpenModalFavorite(false);
          }}>
              <CloseIcon />
          </span>
          <FavoritePostcards/>
        </BoxM>
      </Modal>

            
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
