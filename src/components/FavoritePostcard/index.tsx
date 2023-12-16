import { Box, Button, Modal, TablePagination } from "@mui/material";
import BoxM from "@mui/material/Box";
import { useTypedDispatch, useTypedSelector } from "../../store";
import styles from "./styles.module.scss";
import {
  useGetFavouritePostcardsQuery,
  useGetPostcardsQuery,
  useUpdateFavoritePostcardsMutation,
} from "../../services/postcard.service";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostcardCard } from "../../components/PostcardCard";
import { Postcard } from "../../models/postcard";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  addNewFavouritePostcard,
  removeFavouritePostcard,
} from "../../store/favouritesPostcards.slice";

function FavouritePostcards() {
  const user = useTypedSelector((state) => state.auth.user);
  const favouritePostcardsStore = useTypedSelector(
    (state) => state.favouritesPostcards.favouritesPostcards
  );
  const dispatch = useTypedDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [updateFavoritePostcards] = useUpdateFavoritePostcardsMutation();

  const [isOpenModalFavourite, setIsOpenModalFavourite] = useState(false);
  const handleOpenFavourite = () => setIsOpenModalFavourite(true);
  const handleCloseFavourite = () => setIsOpenModalFavourite(false);

  const { data: paginatedData, refetch } = useGetPostcardsQuery({
    searchParams: searchParams.toString(),
  });

  const [isAddedAsFavorite, setIsAddedAsFavorite] = useState<boolean[]>(
    new Array(1).fill(false)
  );

  const { data: favouritePostcards, refetch: favouriteRefetch } =
    useGetFavouritePostcardsQuery(user?.id ?? "0");

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

  const favouriteStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const onSubmit = () => {
    const reducedPostcard = favoritePostcards.map((postcard) => {
      return {
        postcardId: postcard.postcardId,
        orderId: postcard.number,
      };
    });

    reducedPostcard.splice(0, 1);

    const toSend = {
      userId: user?.id ?? "0",
      postcardIdsWithOrders: reducedPostcard,
    };

    updateFavoritePostcards(toSend);
  };

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

    dispatch(removeFavouritePostcard(number));
    // setFavoritePostcards(
    //   favoritePostcards.filter((item) => {
    //     return item.favIndex !== number;
    //   })
    // );
  };

  const addButtonChange = (index: number) => {
    if (favoritePostcards.length < 7) {
      dispatch(addNewFavouritePostcard(index));
      // setIsAddedAsFavorite((prevIsAddedAsFavorite) =>
      //   prevIsAddedAsFavorite.map((item, i) => (i === index ? true : item))
      // );
    }
  };

  useEffect(() => {
    console.log(favouritePostcardsStore);
  }, [favouritePostcardsStore]);

  const deleteButtonChange = (index: number) => {
    setIsAddedAsFavorite((prevIsAddedAsFavorite) =>
      prevIsAddedAsFavorite.map((item, i) => (i === index ? false : item))
    );
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
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
    <>
      {favouritePostcards?.length === 0 ? (
        <Box className={styles.favourites_none}>
          <span
            className={styles.edit_favourite_none}
            onClick={handleOpenFavourite}
          >
            <EditIcon />
            <span>Edit favourite</span>
          </span>
        </Box>
      ) : (
        <Box className={styles.favourites}>
          <span className={styles.edit_favourite} onClick={handleOpenFavourite}>
            <EditIcon />
            <span>Edit favourite</span>
          </span>

          {favouritePostcards?.map((postcard) => (
            <div className={styles.wrapper}>
              <PostcardCard postcard={postcard} />
            </div>
          ))}
        </Box>
      )}

      <Modal
        open={isOpenModalFavourite}
        onClose={handleCloseFavourite}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxM sx={favouriteStyle}>
          <span
            className={styles.close}
            onClick={() => {
              setIsOpenModalFavourite(false);
            }}
          >
            <CloseIcon />
          </span>
          <Box className={styles.container} sx={{ color: "text.primary" }}>
            <div className={styles.postcard}>
              <div>
                <div className={styles.postcard_list}>
                  {paginatedData?.content?.map(
                    (postcard: Postcard, postcardIndex: number) => (
                      <div key={postcard.id}>
                        <PostcardCard postcard={postcard} />
                        <span className={styles.update}>
                          <div className={styles.container_button}>
                            {isAddedAsFavorite[
                              postcardIndex + pageSize * (pageNumber - 1)
                            ] ? (
                              <>
                                <div className={styles.indicator}>
                                  {favoritePostcards.map(
                                    (favoritePostcard, _) => (
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
                                      postcardIndex +
                                        1 +
                                        pageSize * (pageNumber - 1)
                                    );
                                    deleteButtonChange(
                                      postcardIndex +
                                        pageSize * (pageNumber - 1)
                                    );
                                    favoritePostcards.forEach((postcard) => {});
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
                                    postcardIndex +
                                      1 +
                                      pageSize * (pageNumber - 1),
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
                onClick={async () => {
                  onSubmit();
                  await refetch();
                  await favouriteRefetch();
                  handleCloseFavourite();
                  setFavoritePostcards([
                    {
                      number: 0,
                      favIndex: 0,
                      postcardId: 0,
                    },
                  ]);
                }}
              >
                <CheckIcon />
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
                rowsPerPageOptions={[2, 6, 12, 18]}
              />
            </div>
          </Box>
        </BoxM>
      </Modal>
    </>
  );
}
export default FavouritePostcards;
