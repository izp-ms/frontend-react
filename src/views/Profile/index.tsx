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
import CloseIcon from "@mui/icons-material/Close";
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
import background from "../../assets/png/default-background.png";
import profile from "../../assets/png/default-profile.png";
import BoxM from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { UserData } from "../../models/user";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CountrySelect from "../../components/TextFieldCountry";
import FavouritePostcards from "../../components/FavoritePostcard";
import Base64Converter from "../../components/Base64Converter";
export const Profile = () => {
  const user = useTypedSelector((state) => state.auth.user);

  const { data: userData, refetch } = useGetUserDataQuery(user?.id ?? "0");

  const [updateUserData] = useUpdateUserDataMutation();

  const [editedUser, setEditedUser] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    setEditedUser(userData);
  }, [editedUser, userData, refetch]);

  const [toastStatus, setToastStatus] = useState<ToastStatus>("none");
  const [toastSuccessMessage] = useState<string>("User updated successfully");
  const [toastErrorMessage, setToastErrorMessage] = useState<string>(
    "Something went wrong"
  );

  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);
  const boxMStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 850,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const initialValue = {
    id: user?.id ?? "0",
    firstName: editedUser?.firstName,
    lastName: editedUser?.lastName,
    nickName: editedUser?.nickName,
    country: editedUser?.country,
    city: editedUser?.city,
    birthDate: editedUser?.birthDate,
    avatarBase64: editedUser?.avatarBase64,
    backgroundBase64: editedUser?.backgroundBase64,
    description: editedUser?.description,
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
          if (response.error) {
            setToastStatus("error");
            setToastErrorMessage(
              response.error.data.message ?? "Something went wrong"
            );
            return null;
          }
          setToastStatus("success");
          refetch();
          setOpenProfile(false);
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

  const handleSetCountry = (country: string) => {
    setFieldValue("country", country);
  };

  const handleSetAvatar = (avatar: string) => {
    setFieldValue("avatarBase64", avatar);
  };
  const handleSetBackground = (background: string) => {
    setFieldValue("backgroundBase64", background);
  };

  return (
    <Box className={styles.screen}>
      <Box className={styles.container} sx={{ color: "text.primary" }}>
        <Box className={styles.profile} sx={{ background: "background.paper" }}>
          {editedUser?.backgroundBase64 ? (
            <img
              src={`data:image/jpeg;base64${editedUser?.backgroundBase64}`}
              alt="background"
              className={`${styles.background_image} ${styles.no_draggable}`}
            />
          ) : (
            <img
              src={background}
              alt="background"
              className={`${styles.background_image} ${styles.no_draggable}`}
            />
          )}
          <div className={styles.avatar}>
            <Box
              className={styles.avatar_back}
              sx={{ background: "background.paper" }}
            >
              {editedUser?.avatarBase64 ? (
                <Avatar
                  className={styles.avatar_image}
                  alt="Avatar"
                  src={`data:image/jpeg;base64${editedUser?.avatarBase64}`}
                />
              ) : (
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
                <BoxM sx={boxMStyle} className={styles.pop_up}>
                  <span
                    className={styles.close}
                    onClick={() => {
                      setOpenProfile(false);
                    }}
                  >
                    <CloseIcon />
                  </span>
                  <div className={styles.wrap_images}>
                    <Base64Converter
                      image={values.avatarBase64}
                      setImage={handleSetAvatar}
                      shape="avatar"
                    />
                    <Base64Converter
                      image={values.backgroundBase64}
                      setImage={handleSetBackground}
                      shape="background"
                    />
                  </div>
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
                  <CountrySelect
                    country={values.country}
                    handleSetCountry={handleSetCountry}
                  />
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
                  {/* <TextareaAutosize
                    className={styles.form_input_description}
                    value={values.description}
                    maxRows={3}
                    onChange={(e) => setFieldValue("description", e.target.value)}
                  /> */}

                  <TextField
                    className={styles.form_input}
                    label="Description"
                    multiline
                    rows={4}
                    placeholder="Enter your description"
                    value={values.description}
                    error={Boolean(errors.description && touched.description)}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                  />
                  <span
                    className={styles.update}
                    onClick={() => {
                      handleUpdateUser();
                    }}
                  >
                    <Button
                      sx={{
                        marginBottom: "1rem",
                        marginTop: "1rem",
                        fontSize: "20px",
                        fontWeight: "400",
                        fontStyle: "normal",
                        letterSpacing: "0px",
                        fontFamily: "Rubik",
                      }}
                      variant="contained"
                      className={styles.btn}
                    >
                      <CheckIcon />
                      Save
                    </Button>
                  </span>
                </BoxM>
              </Modal>
              <span className={styles.edit_profile} onClick={handleOpenProfile}>
                <EditIcon />
                <span>Edit profile</span>
              </span>
            </div>
          </div>

          <div className={styles.profile_info}>
            <div className={styles.info}>
              {/* <span className={styles.info_name}>Nickname:</span> */}
              <span className={styles.info_value}>
                {editedUser?.nickName ?? "-"}
              </span>
            </div>

            <div className={styles.info}>
              <span className={styles.info_names}>
                <>
                  {editedUser?.firstName ?? "-"} {editedUser?.lastName ?? "-"}
                </>
              </span>
            </div>
          </div>

          <div className={styles.accordion_container}>
            <Accordion className={styles.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "400",
                    fontStyle: "normal",
                    letterSpacing: "0px",
                    fontFamily: "Rubik",
                  }}
                  className={styles.about_me}
                >
                  About me
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.bio}>
                  <div className={styles.country}>
                    <FlagIcon />

                    <span>{editedUser?.country ?? "-"}</span>
                  </div>
                  <div className={styles.city}>
                    <LocationCityIcon />

                    <span>{editedUser?.city ?? "-"}</span>
                  </div>
                  <div className={styles.birth_date}>
                    <CakeIcon />

                    <span>
                      {editedUser?.birthDate
                        ? format(new Date(editedUser.birthDate), "dd.MM.yyyy")
                        : "-"}
                    </span>
                  </div>
                </div>
                <Typography>
                  <div className={styles.description}>
                    {editedUser?.description ?? "-"}
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className={styles.postcards_info}>
            <div className={styles.info}>
              <span className={styles.info_name}>Received</span>
              <span className={styles.info_value}>
                {editedUser?.postcardsReceived ?? "-"}
              </span>
            </div>
            <div className={styles.info}>
              <span className={styles.info_name}>Sent</span>
              <span className={styles.info_value}>
                {editedUser?.postcardsSent ?? "-"}
              </span>
            </div>
            <div className={styles.info}>
              <span className={styles.info_name}>Score</span>
              <span className={styles.info_value}>
                {editedUser?.score ?? "-"}
              </span>
            </div>
          </div>
        </Box>

        <FavouritePostcards />

        <Toast
          toastStatus={toastStatus}
          successMessage={toastSuccessMessage}
          errorMessage={toastErrorMessage}
          handleToastClose={() => setToastStatus("none")}
        />
      </Box>
    </Box>
  );
};
