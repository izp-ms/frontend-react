import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./styles.module.scss";
import "./transition.scss";
import { Postcard } from "../../models/postcard";
import { PostcardFront } from "./components/PostcardFront";
import { PostcardBack } from "./components/PostcardBack";

interface Props {
  postcard: Postcard;
}

export const PostcardCard = (props: Props) => {
  const { postcard } = props;
  const [showReverse, setShowReverse] = useState<boolean>(false);

  return (
    <div className={styles.transition}>
      <CSSTransition in={showReverse} timeout={500} classNames="flip">
        <div
          className={styles.card}
          onClick={() => setShowReverse((prev) => !prev)}
        >
          <div className={styles.card_back}>
            <PostcardBack postcard={postcard} />
          </div>
          <div className={styles.card_front}>
            <PostcardFront postcard={postcard} />
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
