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
        className={styles.front_image}
        src={postcard.imageBase64}
        alt="postcard"
      />
      <div>PostcardFront {postcard.country}</div>
      <div>lorem100</div>
    </div>
  );
};
