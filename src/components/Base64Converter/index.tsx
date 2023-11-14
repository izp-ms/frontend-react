import React, { useState } from "react";
import styles from "./styles.module.scss";

interface Props {
  image?: string;
  setImage: (image: string) => void;
}

function Base64Converter(props: Props) {
  const { image, setImage } = props;
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

  return (
    <div className={styles.container}>
      {image ? (
        <img alt="Converter" src={img} className={styles.img} />
      ) : (
        <div className={styles.img} />
      )}

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
