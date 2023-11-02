import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./styles.module.scss";
import "./transition.scss";
import { useGetPaginatedPostardQuery } from "../../services/postcard.service";

interface Props {
  title?: string;
}

export const Postcard = (props: Props) => {
  const [showReverse, setShowReverse] = useState<boolean>(false);
  const { data: paginatedPostcardData, refetch:getInfo} = useGetPaginatedPostardQuery({
    pagination:{
      pageNumber: 1,
      pageSize: 10,
    },
    filters: {
      userId: 1024,
    },
  }
);
  return (
      <div className={styles.transition}>
        <CSSTransition in={showReverse} timeout={500} classNames="flip">
          <div
            className={styles.card}
            onClick={() => setShowReverse((prev) => !prev)}
          >
            
            {/* <div className={styles.card_front}>
            {paginatedPostcardData?.content.map(postcard =>{
              return <div>{postcard.id}</div>;
            })}</div> */}
            <div className={styles.card_front}>
            {paginatedPostcardData?.content[0].title}
            
            </div>

            <div className={styles.card_back}>Back</div>
            
          </div>
        </CSSTransition>
      </div>
  );
};
