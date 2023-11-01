import { PostcardCard } from "../../../../components/PostcardCard";
import { Postcard } from "../../../../models/postcard";

import styles from "../../styles.module.scss";

interface Props {
  postcards: Postcard[];
}

export const MyPostcards = (props: Props) => {
  const { postcards } = props;

  return (
    <div className={styles.postcard}>
      <div>My Postcards</div>
      <div>
        <div className={styles.postcard_list}>
          {postcards.map((postcard: Postcard) => (
            <PostcardCard postcard={postcard} />
          ))}
        </div>
      </div>
    </div>
  );
};