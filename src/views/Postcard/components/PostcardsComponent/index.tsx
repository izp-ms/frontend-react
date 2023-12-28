import { PostcardCard } from "../../../../components/PostcardCard";
import { Postcard } from "../../../../models/postcard";
import { PostcardToSend } from "./PostcardToSend";
import styles from "./styles.module.scss";

interface Props {
  postcards: Postcard[];
  refetch?: () => void;
}

export const PostcardsComponent = (props: Props) => {
  const { postcards, refetch } = props;

  return (
    <div>
      {postcards.length ? (
        <div className={styles.postcard_list}>
          {postcards.map((postcard: Postcard) => (
            <div>
              <PostcardCard postcard={postcard} />
              {!postcard.isSent && (
                <PostcardToSend postcard={postcard} refetch={refetch} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.wrap}>
          <span className={styles.wrap_alert}>
            Unfortunately, We couldn't find any postcards :(
          </span>
        </div>
      )}
    </div>
  );
};
