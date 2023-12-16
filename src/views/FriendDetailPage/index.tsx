import "./styles.module.scss";
import { useTypedSelector } from "../../store";
import { useGetUserDataQuery } from "../../services/user.service";
import FlagIcon from "@mui/icons-material/Flag";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CakeIcon from "@mui/icons-material/Cake";
import { Avatar, Box } from "@mui/material";
import styles from "./styles.module.scss";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Toast, ToastStatus } from "../../components/Toast";
import background from "../../assets/png/default-background.png";
import profile from "../../assets/png/default-profile.png";
import Button from "@mui/material/Button";
import { UserData } from "../../models/user";
import { useGetFavouritePostcardsQuery } from "../../services/postcard.service";
import { PostcardCard } from "../../components/PostcardCard";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  useDeleteFollowFriendMutation,
  useGetIsFollowingQuery,
  usePostFollowFriendMutation,
} from "../../services/friend.service";
import { useNavigate, useParams } from "react-router-dom";

export const FriendDetailPage = () => {
  const user = useTypedSelector((state) => state.auth.user);

  const params = useParams();
  const [friendId] = useState<string>(params.id ?? "0");

  const { data: userData, refetch } = useGetUserDataQuery(
    friendId ? friendId : "0"
  );

  const [editedUser, setEditedUser] = useState<UserData | undefined>(undefined);
  const [follow] = usePostFollowFriendMutation();
  const [unFollow] = useDeleteFollowFriendMutation();

  useEffect(() => {
    console.log(params);
  }, [params]);

  const { data: isFollowing, refetch: refetchIsFollowing } =
    useGetIsFollowingQuery(parseInt(friendId) ?? 0);

  useEffect(() => {
    setEditedUser(userData);
    refetchIsFollowing();
  }, [editedUser, userData, refetch, refetchIsFollowing]);

  const [toastStatus, setToastStatus] = useState<ToastStatus>("none");
  const [toastSuccessMessage] = useState<string>("User updated successfully");
  const [toastErrorMessage] = useState<string>("Something went wrong");

  const { data: favouritePostcards } = useGetFavouritePostcardsQuery(
    user?.id ?? "0"
  );

  const navigate = useNavigate();

  if (!userData) {
    return <div>Cannot find user</div>;
  }
  return (
    <Box className={styles.container} sx={{ color: "text.primary" }}>
      <Box className={styles.profile} sx={{ background: "background.paper" }}>
        {editedUser?.backgroundBase64 ? (
          <img
            src={`data:image/jpeg;base64${editedUser?.backgroundBase64}`}
            alt="background"
            className={`${styles.background_image} ${styles.no_draggable}`}
          />
        ) : (
          <img
            src={background}
            alt="background"
            className={`${styles.background_image} ${styles.no_draggable}`}
          />
        )}
        <div className={styles.avatar}>
          <Box
            className={styles.avatar_back}
            sx={{ background: "background.paper" }}
          >
            {editedUser?.avatarBase64 ? (
              <Avatar
                className={styles.avatar_image}
                alt="Avatar"
                src={`data:image/jpeg;base64${editedUser?.avatarBase64}`}
              />
            ) : (
              <Avatar
                className={styles.avatar_image}
                alt="Avatar"
                src={profile}
              />
            )}
          </Box>
        </div>

        <div className={styles.profile_info}>
          <div className={styles.info}>
            <span className={styles.info_value}>
              {editedUser?.nickName ?? "-"}
            </span>
          </div>

          <div className={styles.info}>
            <span className={styles.info_names}>
              <>
                {editedUser?.firstName ?? "-"} {editedUser?.lastName ?? "-"}
              </>
            </span>
          </div>
        </div>

        <div className={styles.accordion_container}>
          <Accordion className={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.about_me}>About me</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.bio}>
                <div className={styles.country}>
                  <FlagIcon />

                  <span>{editedUser?.country ?? "-"}</span>
                </div>
                <div className={styles.city}>
                  <LocationCityIcon />

                  <span>{editedUser?.city ?? "-"}</span>
                </div>
                <div className={styles.birth_date}>
                  <CakeIcon />

                  <span>
                    {editedUser?.birthDate
                      ? format(new Date(editedUser.birthDate), "dd.MM.yyyy")
                      : "-"}
                  </span>
                </div>
              </div>
              <Typography>{editedUser?.description ?? "-"}</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={styles.postcards_info}>
          <div className={styles.info}>
            <span className={styles.info_name}>Received</span>
            <span className={styles.info_value}>
              {editedUser?.postcardsReceived ?? "-"}
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_name}>Sent</span>
            <span className={styles.info_value}>
              {editedUser?.postcardsSent ?? "-"}
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_name}>Score</span>
            <span className={styles.info_value}>
              {editedUser?.score ?? "-"}
            </span>
          </div>
        </div>
      </Box>
      <div className={styles.menu}>
        {isFollowing ? (
          <div className={styles.follow_info}>You are following this user</div>
        ) : (
          <div className={styles.follow_info}>
            You are not following this user
          </div>
        )}

        <div className={styles.buttons}>
          {isFollowing ? (
            <>
              <Button
                variant="contained"
                className={styles.btn}
                onClick={() => {
                  unFollow({
                    userId: parseInt(user?.id ?? "0"),
                    friendId: parseInt(friendId) ?? 0,
                  });
                  refetchIsFollowing();
                  refetch();
                }}
              >
                UnFollow
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                className={styles.btn}
                onClick={() => {
                  follow({
                    userId: parseInt(user?.id ?? "0"),
                    friendId: parseInt(friendId) ?? 0,
                  });
                  refetchIsFollowing();
                  refetch();
                }}
              >
                Follow
              </Button>
            </>
          )}

          <Button
            variant="contained"
            className={styles.btn}
            onClick={() => {
              navigate(`/friends`);
            }}
          >
            back
          </Button>
        </div>
      </div>

      {favouritePostcards?.length === 0 ? (
        <></>
      ) : (
        <Box className={styles.favourites}>
          {favouritePostcards?.map((postcard) => (
            <div className={styles.wrapper}>
              <PostcardCard postcard={postcard} />
            </div>
          ))}
        </Box>
      )}

      <Toast
        toastStatus={toastStatus}
        successMessage={toastSuccessMessage}
        errorMessage={toastErrorMessage}
        handleToastClose={() => setToastStatus("none")}
      />
    </Box>
  );
};
