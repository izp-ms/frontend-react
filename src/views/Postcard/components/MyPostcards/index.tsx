import { PostcardCard } from "../../../../components/PostcardCard";
import { Postcard } from "../../../../models/postcard";

import styles from "../../styles.module.scss";

interface Props {
  postcards: Postcard[];
}

export const MyPostcards = (props: Props) => {
  const { postcards } = props;

  return (
    <div onClick={() => console.log(postcards)}>
      <>
        <div>My Postcards</div>
        <div className={styles.postcard_list}>
          {postcards.map((postcard: Postcard) => {
            return (
              // <div key={postcard.id}>
              <PostcardCard postcard={postcard} />
              // </div>
            );
          })}
        </div>
      </>
    </div>
  );
};
