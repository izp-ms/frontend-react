import { Button, Modal, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.scss";
import BoxM from "@mui/material/Box";
import React, { useState } from "react";
import CountrySelect from "../../../components/TextFieldCountry";
import Base64Converter from "../../../components/Base64Converter";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Toast, ToastStatus } from "../../../components/Toast";
import { usePostPostcardDataMutation } from "../../../services/postcard-data.service";

interface Props {
  refetch: () => void;
}

export const CreatePostcardData = (props: Props) => {
  const { refetch } = props;
  const [openPostcardData, setOpenPostcardData] = React.useState(false);
  const handleOpenPostcardData = () => setOpenPostcardData(true);
  const handleClosePostcardData = () => setOpenPostcardData(false);

  const [addPostcardData] = usePostPostcardDataMutation();

  const [toastStatus, setToastStatus] = useState<ToastStatus>("none");
  const [toastSuccessMessage] = useState<string>("Postcard added successfully");
  const [toastErrorMessage, setToastErrorMessage] = useState<string>(
    "Something went wrong"
  );

  const [nowDate, setNowDate] = useState<string>(
    new Date().toISOString().slice(0, 19) + "Z"
  );

  const initialValue = {
    id: "0",
    imageBase64: "",
    country: "",
    city: "",
    title: "",
    longitude: "",
    latitude: "",
    collectRangeInMeters: 0,
    type: "PLACE",
    createdAt: nowDate,
  };

  const userSchema = Yup.object().shape({
    id: Yup.string().required("Id is required"),
    imageBase64: Yup.string().required("Image is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    title: Yup.string().required("Title is required"),
    longitude: Yup.string().required("Longitude is required"),
    latitude: Yup.string().required("Latitude is required"),
    collectRangeInMeters: Yup.string().required("Collect Range is required"),
    type: Yup.string().required("Type is required"),
    createdAt: Yup.string().required("Date is required"),
  });

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

  const { values, errors, touched, setFieldValue, submitForm } = useFormik({
    initialValues: initialValue,
    validationSchema: userSchema,

    onSubmit: async (values) => {
      await addPostcardData(values)
        .then((response: any) => {
          if (response.error) {
            setToastStatus("error");
            setToastErrorMessage(
              response.error.data.message ?? "Something went wrong"
            );
            return null;
          }
          setToastStatus("success");
          refetchPostcard();
          handleClosePostcardData();
        })
        .catch((e: { message: any }) => {
          setToastStatus("error");
          setToastErrorMessage(e.message ?? "Something went wrong");
        });
    },
    enableReinitialize: true,
  });

  const handlePostcardData = async (): Promise<void> => {
    submitForm();
  };

  const handleSetCountry = (country: string) => {
    setFieldValue("country", country);
  };

  const handleSetImage = (image: string) => {
    setFieldValue("imageBase64", image);
  };

  const refetchPostcard = () => {
    if (refetch) {
      refetch();
    }
  };

  return (
    <div>
      <span
        className={styles.add_poscard_data}
        onClick={() => {
          handleOpenPostcardData();
          setNowDate(new Date().toISOString().slice(0, 19) + "Z");
        }}
      >
        +
      </span>

      <Modal open={openPostcardData} onClose={handleClosePostcardData}>
        <BoxM sx={boxMStyle} className={styles.pop_up}>
          <span
            className={styles.close}
            onClick={() => {
              handleClosePostcardData();
            }}
          >
            <CloseIcon />
          </span>
          <span className={styles.new_postcard}>Add new postcard</span>
          <div className={styles.form}>
            <div className={styles.inputs}>
              <TextField
                className={styles.form_input}
                label="Title"
                variant="outlined"
                value={values.title}
                error={Boolean(errors.title && touched.title)}
                onChange={(e) => setFieldValue("title", e.target.value)}
              />

              <TextField
                className={styles.form_input}
                label="City"
                variant="outlined"
                value={values.city}
                error={Boolean(errors.city && touched.city)}
                onChange={(e) => setFieldValue("city", e.target.value)}
              />
              <CountrySelect
                country={values.country}
                handleSetCountry={handleSetCountry}
              />
              <TextField
                className={styles.form_input}
                label="Longitude"
                variant="outlined"
                value={values.longitude}
                error={Boolean(errors.longitude && touched.longitude)}
                onChange={(e) => setFieldValue("longitude", e.target.value)}
              />

              <TextField
                className={styles.form_input}
                label="Latitude"
                variant="outlined"
                value={values.latitude}
                error={Boolean(errors.latitude && touched.latitude)}
                onChange={(e) => setFieldValue("latitude", e.target.value)}
              />

              <TextField
                className={styles.form_input}
                label="Collect Range In Meters"
                variant="outlined"
                value={values.collectRangeInMeters}
                error={Boolean(
                  errors.collectRangeInMeters && touched.collectRangeInMeters
                )}
                onChange={(e) =>
                  setFieldValue("collectRangeInMeters", e.target.value)
                }
              />
            </div>
            <Base64Converter
              image={values.imageBase64}
              setImage={handleSetImage}
              shape="postcard"
            />
          </div>
          <span
            className={styles.update}
            onClick={async () => {
              handlePostcardData();
              await refetchPostcard();
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
              Add
            </Button>
          </span>
        </BoxM>
      </Modal>
      <Toast
        toastStatus={toastStatus}
        successMessage={toastSuccessMessage}
        errorMessage={toastErrorMessage}
        handleToastClose={() => setToastStatus("none")}
      />
    </div>
  );
};
