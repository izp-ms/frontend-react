import { PostcardData } from "../../../../models/postcard-data";
import styles from "./styles.module.scss";
import { useGetPostcardCollectionQuery } from "../../../../services/postcard.service";
import { useEffect } from "react";

interface Props {
  postcards: PostcardData[];
  user?: string;
}

export const PostcardsDataComponent = (props: Props) => {
  const { postcards, user } = props;

  const { data: postcardCollection, refetch: collectionRefetch } =
    useGetPostcardCollectionQuery(user ?? "0");

  useEffect(() => {
    collectionRefetch();
  }, [collectionRefetch]);

  return (
    <div>
      {postcards.length ? (
        <div className={styles.postcard_list}>
          {postcards.map((postcard: PostcardData) => (
            <div>
              <div className={styles.card}>
                {user !== undefined ? (
                  <>
                    {postcardCollection?.postcardDataIds.map((number: any) =>
                      number === postcard.id ? (
                        <img
                          className={`${styles.front__image2} ${styles.no_draggable}`}
                          src={postcard.imageBase64}
                          alt="postcardData"
                        />
                      ) : (
                        <img
                          className={`${styles.front__image1} ${styles.no_draggable}`}
                          src={postcard.imageBase64}
                          alt="postcardData"
                        />
                      )
                    )}
                  </>
                ) : (
                  <img
                    className={`${styles.front__image2} ${styles.no_draggable}`}
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
          <span className={styles.wrap_alert}>Unfortunately,We couldn't find any postcards :(</span>
        </div>
      )}
    </div>
  );
};
