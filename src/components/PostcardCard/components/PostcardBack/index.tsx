import { format } from "date-fns";
import { Postcard } from "../../../../models/postcard";
import styles from "./styles.module.scss";

interface Props {
  postcard: Postcard;
}

export const PostcardBack = (props: Props) => {
  const { postcard } = props;
  return <div
            className={styles.back} 
          > 
            <div
              className={styles.back_title}
            >{postcard.title}</div>
            <div
              className={styles.back_content}>
                {postcard.content}</div>
            <div className={styles.back_date}>
                {postcard.createdAt 
                  ? format(new Date(postcard.createdAt), "dd.MM.yyyy")
                  : ""}
            </div>
            <div className={styles.back_line_1}></div>
            <div className={styles.back_line_2}></div>
            <div className={styles.back_line_3}></div>
            <div className={styles.back_line_4}></div>
          </div>;
};
