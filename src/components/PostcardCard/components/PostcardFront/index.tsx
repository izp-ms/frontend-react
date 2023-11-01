import { Postcard } from "../../../../models/postcard";

import styles from "./styles.module.scss";

interface Props {
  postcard: Postcard;
}

export const PostcardFront = (props: Props) => {
  const { postcard } = props;
  return <div className={styles.front}>PostcardFront {postcard.country}</div>;
};
