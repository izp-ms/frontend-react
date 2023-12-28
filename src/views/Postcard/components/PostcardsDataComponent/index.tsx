import { PostcardData } from "../../../../models/postcard-data";
import styles from "./styles.module.scss";
import { useGetPostcardCollectionQuery } from "../../../../services/postcard.service";
import { useEffect, useState } from "react";

interface Props {
  postcards: PostcardData[];
  user?: string;
}

export const PostcardsDataComponent = (props: Props) => {
  const { postcards, user } = props;

  const { data: postcardCollection, refetch: collectionRefetch } =
    useGetPostcardCollectionQuery(user ?? "0");

  const checkCollection = (postcardData: number) => {
    let check = false;
    postcardCollection?.postcardDataIds.map((number: number) => {
      if (postcardData == number) {
        check = true;
      }
    });
    if (check) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      {postcards.length ? (
        <div className={styles.postcard_list}>
          {postcards.map((postcard: PostcardData) => (
            <div>
              <div>
                {user !== undefined ? (
                  <>
                    {postcardCollection?.postcardDataIds.length === 0 ||
                    checkCollection(parseInt(postcard.id)) ? (
                      <img
                        className={`${styles.card} ${styles.gray} ${styles.no_draggable}`}
                        src={postcard.imageBase64}
                        alt="postcardData"
                      />
                    ) : (
                      <img
                        className={`${styles.card} ${styles.no_draggable}`}
                        src={postcard.imageBase64}
                        alt="postcardData"
                      />
                    )}
                  </>
                ) : (
                  <img
                    className={`${styles.card} ${styles.no_draggable}`}
                    src={postcard.imageBase64}
                    alt="postcardData"
                  />
                )}
              </div>
              <div className={styles.title}>{postcard.title}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.wrap}>
          <span className={styles.wrap_alert}>
            Unfortunately,We couldn't find any postcards :(
          </span>
        </div>
      )}
    </div>
  );
};
