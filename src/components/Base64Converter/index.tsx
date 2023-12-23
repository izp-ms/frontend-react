import React, { useState } from "react";
import styles from "./styles.module.scss";

interface Props {
  image?: string;
  setImage: (image: string) => void;
  shape?: "avatar" | "background" | "postcard";
}

function Base64Converter(props: Props) {
  const { image, setImage, shape } = props;
  const [img, setImg] = useState<string | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setImage(imageDataUrl);
        setImg(imageDataUrl);
        props.setImage(imageDataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const renderShapeType = () => {
    switch (shape) {
      case "avatar":
        return (
          <>
            {image ? (
              <img
                alt="Converter"
                src={image}
                className={`${styles.img_avatar} ${styles.img}`}
              />
            ) : (
              <div className={`${styles.img_avatar} ${styles.img}`} />
            )}
          </>
        );
      case "background":
        return (
          <>
            {image ? (
              <img
                alt="Converter"
                src={image}
                className={`${styles.img_background} ${styles.img}`}
              />
            ) : (
              <div className={`${styles.img_background} ${styles.img}`} />
            )}
          </>
        );
      case "postcard":
        return (
          <>
            {image ? (
              <div className={styles.img_postcard}>
                <img
                  alt="Converter"
                  src={image}
                  className={styles.img_postcard_img}
                />
              </div>
            ) : (
              <div className={styles.img_postcard_div} />
            )}
          </>
        );
    }
  };
  return (
    <div className={styles.container}>
      <>{renderShapeType()}</>

      <label className={styles.custom_file_upload}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleChange}
        />
        Pick photo
      </label>
    </div>
  );
}
export default Base64Converter;
