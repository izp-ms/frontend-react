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

  const clearAllFavoritePostcard = () => {
    favouritePostcardsStore.map((favoriteNumber: number) => {
      dispatch(removeFavouritePostcard(favoriteNumber));
    });
  };
  const close = () => {
    handleCloseFavourite();
    clearAllFavoritePostcard();
    setIsAddedAsFavorite(new Array(paginatedData?.totalCount).fill(false));
  };
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
    console.log(isAddedAsFavorite);
    const sliced = favouritePostcardsStore.map(
      (favoriteNumber: number, postcardIndexNumber: number) => {
        return {
          postcardId: favoriteNumber,
          orderId: postcardIndexNumber + 1,
        };
      }
    );
    console.log(isAddedAsFavorite);
    const toSend = {
      userId: user?.id ?? "0",
      postcardIdsWithOrders: sliced,
    };

    updateFavoritePostcards(toSend);

    clearAllFavoritePostcard();
    setIsAddedAsFavorite(new Array(paginatedData?.totalCount).fill(false));
    handleCloseFavourite();
  };

  const addButtonChange = (postcardId: number, index: number) => {
    if (favouritePostcardsStore.length < 5) {
      dispatch(addNewFavouritePostcard(postcardId));
      setIsAddedAsFavorite((prevArray) => {
        const newArray = [...prevArray];
        newArray[index] = true;
        return newArray;
      });
    }
  };
  const deleteButtonChange = (postcardId: number, index: number) => {
    if (favouritePostcardsStore.length > 0) {
      dispatch(removeFavouritePostcard(postcardId));
      setIsAddedAsFavorite((prevArray) => {
        const newArray = [...prevArray];
        newArray[index] = false;
        return newArray;
      });
    }
  };

  useEffect(() => {
    console.log(favouritePostcardsStore);
  }, [favouritePostcardsStore]);

  const handleChangePage = async (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage + 1);
    await refetch();
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(1);
    await refetch();
    setIsAddedAsFavorite(new Array(paginatedData?.totalCount).fill(false));
    clearAllFavoritePostcard();
  };

  useEffect(() => {}, [refetch]);

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

      <Modal open={isOpenModalFavourite} onClose={close}>
        <BoxM sx={favouriteStyle}>
          <span
            className={styles.close}
            onClick={() => {
              close();
            }}
          >
            <CloseIcon />
          </span>

          <Box className={styles.container} sx={{ color: "text.primary" }}>
            <div>
              {/* {isAddedAsFavorite.map((value, index) => (
                <div>{`${index + 1}. ${value}`}</div>
              ))} */}
            </div>
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
                                <Button
                                  variant="contained"
                                  className={styles.btn}
                                  onClick={() => {
                                    deleteButtonChange(
                                      postcard.id,
                                      postcardIndex +
                                        pageSize * (pageNumber - 1)
                                    );
                                  }}
                                >
                                  Delete Postcard
                                </Button>
                                {favouritePostcardsStore.map(
                                  (
                                    favoriteNumber: number,
                                    postcardIndexNumber: number
                                  ) => (
                                    <>
                                      {favoriteNumber === postcard.id ? (
                                        <div className={styles.indicator}>
                                          {postcardIndexNumber + 1}
                                        </div>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  )
                                )}
                              </>
                            ) : (
                              <Button
                                variant="contained"
                                className={styles.btn}
                                onClick={() => {
                                  addButtonChange(
                                    postcard.id,
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
