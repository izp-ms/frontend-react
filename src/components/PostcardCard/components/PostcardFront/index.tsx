import { Postcard } from "../../../../models/postcard";

import styles from "./styles.module.scss";

interface Props {
  postcard: Postcard;
}

export const PostcardFront = (props: Props) => {
  const { postcard } = props;
  return (
    <div className={styles.front}>
      <img
        className={`${styles.front__image} ${styles.no_draggable}`}
        src={postcard.imageBase64}
        alt="postcard"
      />
      <div className={styles.front_title}>{postcard.postcardDataTitle}</div>
      <div className={styles.front_country_city}>{postcard.country} - {postcard.city}</div>
    </div>
  );
};
