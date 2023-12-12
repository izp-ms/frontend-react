import { PostcardCard } from "../../../../components/PostcardCard";
import { Postcard } from "../../../../models/postcard";

import styles from "./styles.module.scss";

interface Props {
  postcards: Postcard[];
}

export const PostcardsComponent = (props: Props) => {
  const { postcards } = props;

  return (
    <div>
      {postcards.length ? (
        <div className={styles.postcard_list}>
          {postcards.map((postcard: Postcard) => (
            <PostcardCard postcard={postcard} />
          ))}
      </div>
      ) : ( 
        <div className={styles.wrap}>
          <span className={styles.wrap_alert}>Unfortunately,We couldn't find any postcards :(</span>
        </div>
      )}
    </div>
  );
};
