import { Box, Button, TablePagination } from "@mui/material";
import { useTypedSelector } from "../../store";
import styles from "./styles.module.scss";
import { useGetPostcardsQuery } from "../../services/postcard.service";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostcardCard } from "../../components/PostcardCard";
import { Postcard } from "../../models/postcard";

function FavouritePostcards() {
  const user = useTypedSelector((state) => state.auth.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const { data: paginatedData, refetch } = useGetPostcardsQuery({
    searchParams: searchParams.toString(),
  });
  const [isAddedAsFavorite, setIsAddedAsFavorite] = useState<boolean[]>(
    new Array(1).fill(false)
  );

  const favoritePostcardsArray = [
    {
      number: 0,
      favIndex: 0,
      postcardId: 0,
    },
  ];
  const [favoritePostcards, setFavoritePostcards] = useState(
    favoritePostcardsArray
  );

  const handleAddFavoritePostcard = (index: number, postcardId: number) => {
    if (favoritePostcards.length >= 7)
      return alert("You can add only 6 Postcards");
    else {
      setFavoritePostcards((prevfavoritePostcards) => [
        ...prevfavoritePostcards,
        {
          number: favoritePostcards.length,
          favIndex: index,
          postcardId: postcardId,
        },
      ]);
    }
  };

  const handleDeleteFavoritePostcard = (number: number) => {
    let checkNumber = false;
    favoritePostcards.forEach((postcard) => {
      if (postcard.favIndex === number) {
        checkNumber = true;
      } else if (checkNumber) {
        postcard.number = postcard.number - 1;
      }
    });

    setFavoritePostcards(
      favoritePostcards.filter((item) => {
        return item.favIndex !== number;
      })
    );
  };

  const addButtonChange = (index: number) => {
    if (favoritePostcards.length < 7)
      setIsAddedAsFavorite((prevIsAddedAsFavorite) =>
        prevIsAddedAsFavorite.map((item, i) => (i === index ? true : item))
      );
  };
  const deleteButtonChange = (index: number) => {
    setIsAddedAsFavorite((prevIsAddedAsFavorite) =>
      prevIsAddedAsFavorite.map((item, i) => (i === index ? false : item))
    );
  };
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(newPage);
    setPageNumber(newPage + 1);
    refetch();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(1);
    refetch();
  };
  useEffect(() => {
    setIsAddedAsFavorite(new Array(paginatedData?.totalCount).fill(false));
  }, [paginatedData]);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    searchParams.set("UserId", user?.id ?? "0");
    searchParams.set("PageSize", pageSize.toString());
    searchParams.set("PageNumber", pageNumber.toString());
    setSearchParams(searchParams);
  }, [pageNumber, pageSize, searchParams, setSearchParams, user?.id]);

  return (
    <Box className={styles.container} sx={{ color: "text.primary" }}>
      <div className={styles.postcard}>
        <ul>
          {isAddedAsFavorite.map((item, x) => {
            return <span key={x}>{item.toString()} </span>;
          })}
        </ul>
        <main>
          <ul>
            {favoritePostcards.map((favoritePostcard, index) => (
              <li key={index}>
                <span>number: {favoritePostcard.number} </span>
                <span>index: {favoritePostcard.favIndex} </span>
                <span>postcard id: {favoritePostcard.postcardId}</span>
              </li>
            ))}
          </ul>
        </main>
        <div>
          <div className={styles.postcard_list}>
            {paginatedData?.content?.map(
              (postcard: Postcard, postcardIndex: number) => (
                <div>
                  {/* <div className={styles.favorite_number}>
                    {postcardIndex + 1}
                    {"---"}
                    {postcard.id}
                  </div> */}
                  <PostcardCard postcard={postcard} />
                  <span className={styles.update}>
                    <div className={styles.container_button}>
                      {isAddedAsFavorite[
                        postcardIndex + pageSize * (pageNumber - 1)
                      ] ? (
                        <>
                          <div className={styles.indicator}>
                            {favoritePostcards.map(
                              (favoritePostcard, index) => (
                                <>
                                  {favoritePostcard.favIndex ===
                                  postcardIndex +
                                    1 +
                                    pageSize * (pageNumber - 1) ? (
                                    <>{favoritePostcard.number}</>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              )
                            )}
                          </div>
                          <Button
                            variant="contained"
                            className={styles.btn}
                            onClick={() => {
                              handleDeleteFavoritePostcard(
                                postcardIndex + 1 + pageSize * (pageNumber - 1)
                              );
                              deleteButtonChange(
                                postcardIndex + pageSize * (pageNumber - 1)
                              );
                              favoritePostcards.forEach((postcard) => {
                                console.log(
                                  "postcard.number: " +
                                    postcard.number +
                                    " " +
                                    postcard.favIndex
                                );
                              });
                            }}
                          >
                            Delete Postcard
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          className={styles.btn}
                          onClick={() => {
                            handleAddFavoritePostcard(
                              postcardIndex + 1 + pageSize * (pageNumber - 1),
                              postcard.id
                            );
                            addButtonChange(
                              postcardIndex + pageSize * (pageNumber - 1)
                            );
                          }}
                        >
                          Add Postcard
                        </Button>
                      )}
                    </div>
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className={styles.tabs}>
        <Button
          variant="contained"
          className={styles.save}
          onClick={() => {
            console.log(favoritePostcards);
          }}
        >
          Save
        </Button>
        <TablePagination
          className={styles.pagination}
          component="div"
          count={paginatedData?.totalCount ?? 0}
          page={pageNumber - 1}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[2, 3, 6]}
        />
      </div>
    </Box>
  );
}
export default FavouritePostcards;
