import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./styles.module.scss";
import "./transition.scss";

interface Props {
  title?: string;
}

export const Postcard = (props: Props) => {
  const [showReverse, setShowReverse] = useState<boolean>(false);

  return (
    <div className={styles.transition}>
      <CSSTransition in={showReverse} timeout={500} classNames="flip">
        <div
          className={styles.card}
          onClick={() => setShowReverse((prev) => !prev)}
        >
          <div className={styles.card_back}>Back</div>
          <div className={styles.card_front}>Front</div>
        </div>
      </CSSTransition>
    </div>
  );
};
