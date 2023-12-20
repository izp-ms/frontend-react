import {
  Button,
  TextField,
  Typography,
  Avatar,
  TablePagination,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useUpdateTransferPostcardMutation } from "../../../../../services/postcard.service";
import { Postcard } from "../../../../../models/postcard";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.scss";
import BoxM from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useGetFriendsQuery } from "../../../../../services/friend.service";
import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../../../../store";
import { useSearchParams } from "react-router-dom";

interface Props {
  postcard: Postcard;
  refetch?: () => void;
}

export const PostcardToSend = (props: Props) => {
  const user = useTypedSelector((state) => state.auth.user);
  const { postcard, refetch } = props;
  const [openPostcard, setOpenPostcard] = React.useState(false);
  const [selectedFriend, setSelectedFriend] = useState<string>("0");
  const [postcardToSendTitle, setPostcardToSendTitle] = useState<string>("");
  const [postcardToSendDescription, setPostcardToSendDescription] =
    useState<string>("");
  const [updateTransferPostcards] = useUpdateTransferPostcardMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data: friendsData, refetch: friendsRefetch } = useGetFriendsQuery(
    {
      searchParams: searchParams.toString(),
    },
    { skip: !user?.id, refetchOnMountOrArgChange: true }
  );

  const boxMStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 850,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleOpenPostcard = () => setOpenPostcard(true);

  const handleClosePostcard = () => setOpenPostcard(false);

  const handleChangePage = async (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage + 1);
    await friendsRefetch();
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(1);
    await friendsRefetch();
  };
  const refetchPostcard = () => {
    if (refetch) {
      refetch();
    }
  };
  const onSubmit = () => {
    if (selectedFriend === "0") {
      alert("Please choose a friend");
      return;
    }

    const toSend = {
      postcardDto: {
        id: postcard.id ?? 0,
        title: postcardToSendTitle,
        content: postcardToSendDescription,
        postcardDataId: postcard.postcardDataId,
        createdAt: new Date().toISOString(),
        userId: postcard.userId,
        isSent: true,
      },
      newUserId: parseInt(selectedFriend) ?? 0,
    };
    updateTransferPostcards(toSend);
  };

  useEffect(() => {
    searchParams.set("UserId", user?.id ?? "0");
    searchParams.set("PageNumber", pageNumber.toString());
    searchParams.set("PageSize", pageSize.toString());
    setSearchParams(searchParams);
  }, [pageNumber, pageSize, searchParams, setSearchParams, user?.id]);

  return (
    <div>
      <Button
        sx={{
          marginBottom: "1rem",
          marginTop: "1rem",
          fontSize: "16px",
          fontWeight: "400",
          fontStyle: "normal",
          letterSpacing: "0px",
          fontFamily: "Rubik",
        }}
        variant="contained"
        className={styles.btn}
        onClick={() => {
          handleOpenPostcard();
        }}
      >
        Send
      </Button>
      <Modal
        open={openPostcard}
        onClose={handleClosePostcard}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxM sx={boxMStyle} className={styles.pop_up}>
          <span
            className={styles.close}
            onClick={() => {
              handleClosePostcard();
            }}
          >
            <CloseIcon />
          </span>
          <div className={styles.form}>
            <div className={styles.inputs}>
              <TextField
                className={styles.form_input}
                label="Title"
                variant="outlined"
                inputProps={{ maxLength: 50 }}
                onChange={(e) => setPostcardToSendTitle(e.target.value)}
              />
              <TextField
                className={styles.form_input}
                label="Description"
                multiline
                rows={4}
                placeholder="Enter your description"
                inputProps={{ maxLength: 255 }}
                onChange={(e) => setPostcardToSendDescription(e.target.value)}
              />
            </div>
            <div className={styles.postcard}>
              <div className={styles.postcard_wrap}>
                <img
                  className={`${styles.card} ${styles.no_draggable}`}
                  src={postcard.imageBase64}
                  alt="postcardData"
                />
                <div className={styles.front_title}>
                  {postcard.postcardDataTitle}
                </div>
                <div className={styles.front_country_city}>
                  {postcard.country} - {postcard.city}
                </div>
              </div>
            </div>
          </div>
          <FormControl component="fieldset">
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                fontStyle: "normal",
                letterSpacing: "0px",
                fontFamily: "Rubik",
              }}
              component="legend"
            >
              Choose postcard recipient
            </FormLabel>
            <RadioGroup
              aria-label="Friend"
              name={`radio-buttons-group`}
              value={selectedFriend}
              onChange={(e) => setSelectedFriend(e.target.value)}
            >
              <div className={styles.friends_list}>
                {friendsData?.content.map((friend) => (
                  <FormControlLabel
                    value={friend.id}
                    control={
                      <Radio
                        sx={{ display: "none" }}
                        className={styles.hidden}
                      />
                    }
                    label={
                      <div
                        key={friend.id}
                        className={`${styles.friendCard} ${
                          friend.id == selectedFriend
                            ? styles.friendCard_gold
                            : styles.friendCard_white
                        }`}
                      >
                        <Avatar
                          src={friend.avatarBase64}
                          alt={friend.nickName}
                        />
                        <Typography
                          sx={{
                            fontSize: "24px",
                            fontWeight: "400",
                            fontStyle: "normal",
                            letterSpacing: "0px",
                            fontFamily: "Rubik",
                          }}
                          variant="h6"
                        >
                          {friend.nickName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "400",
                            fontStyle: "normal",
                            letterSpacing: "0px",
                            fontFamily: "Rubik",
                          }}
                        >
                          {friend.email}
                        </Typography>
                        <Typography>{friend.role}</Typography>
                      </div>
                    }
                  />
                ))}
              </div>
            </RadioGroup>
          </FormControl>
          <TablePagination
            className={styles.pagination}
            component="div"
            count={friendsData?.totalCount ?? 0}
            page={pageNumber - 1}
            onPageChange={handleChangePage}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[2, 3, 10, 25, 50]}
          />
          <span
            className={styles.update}
            onClick={async () => {
              onSubmit();
              await refetchPostcard();
              await friendsRefetch();
              handleClosePostcard();
            }}
          >
            <Button
              sx={{
                fontSize: "20px",
                fontWeight: "400",
                fontStyle: "normal",
                letterSpacing: "0px",
                fontFamily: "Rubik",
              }}
              variant="contained"
              className={styles.btn}
            >
              <CheckIcon />
              Send
            </Button>
          </span>
        </BoxM>
      </Modal>
    </div>
  );
};
