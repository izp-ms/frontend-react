import React, { useEffect, useState } from "react";
import {
  Box,
  TablePagination,
  Typography,
  Avatar,
  Tab,
  Tabs,
} from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "../../store";
import styles from "./styles.module.scss";
import {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetFriendsQuery,
} from "../../services/friend.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setFriendId } from "../../store/friends.slice";

export const FriendsPage = () => {
  const user = useTypedSelector((state) => state.auth.user);

  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const { data: friendsData, refetch: friendsRefetch } = useGetFriendsQuery(
    {
      searchParams: searchParams.toString(),
    },
    { skip: !user?.id, refetchOnMountOrArgChange: true }
  );

  const { data: followersData, refetch: followersRefetch } =
    useGetFollowersQuery(
      {
        searchParams: searchParams.toString(),
      },
      { skip: !user?.id, refetchOnMountOrArgChange: true }
    );

  const { data: followingData, refetch: followingRefetch } =
    useGetFollowingQuery(
      {
        searchParams: searchParams.toString(),
      },
      { skip: !user?.id, refetchOnMountOrArgChange: true }
    );

  const handleChangePage = async (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage + 1);
    await friendsRefetch();
    await followersRefetch();
    await followingRefetch();
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(1);
    await friendsRefetch();
    await followersRefetch();
    await followingRefetch();
  };

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setPageNumber(1);
    friendsRefetch();
    followersRefetch();
    followingRefetch();
    setCurrentTab(newValue);
  };

  useEffect(() => {
    searchParams.set("UserId", user?.id ?? "0");
    searchParams.set("PageNumber", pageNumber.toString());
    searchParams.set("PageSize", pageSize.toString());
    setSearchParams(searchParams);
  }, [
    pageNumber,
    pageSize,
    currentTab,
    searchParams,
    setSearchParams,
    user?.id,
  ]);

  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  return (
    <Box
      className={styles.container}
      sx={{ color: "text.primary", marginTop: 10 }}
    >
      <Tabs value={currentTab} onChange={handleChangeTab} centered>
        <Tab label="Users" />
        <Tab label="Followers" />
        <Tab label="Following" />
      </Tabs>

      {currentTab === 0 && (
        <div>
          {friendsData?.content.map((friend) => (
            <div
              key={friend.id}
              className={styles.friendCard}
              onClick={() => {
                console.log(friend.id);
                dispatch(setFriendId(friend.id));
                navigate(`/friends/${friend.id}`);
              }}
            >
              <Avatar src={friend.avatarBase64} alt={friend.nickName} />
              <Typography variant="h6">{friend.nickName}</Typography>
              <Typography>{friend.email}</Typography>
              <Typography>{friend.role}</Typography>
            </div>
          ))}
        </div>
      )}

      {currentTab === 1 && (
        <div>
          followers
          {followersData?.content.map((friend) => (
            <div key={friend.id} className={styles.friendCard}>
              <Avatar src={friend.avatarBase64} alt={friend.nickName} />
              <Typography variant="h6">{friend.nickName}</Typography>
              <Typography>{friend.email}</Typography>
              <Typography>{friend.role}</Typography>
            </div>
          ))}
        </div>
      )}

      {currentTab === 2 && (
        <div>
          {followingData?.content.length}
          {followingData?.content.map((friend) => (
            <div key={friend.id} className={styles.friendCard}>
              <Avatar src={friend.avatarBase64} alt={friend.nickName} />
              <Typography variant="h6">{friend.nickName}</Typography>
              <Typography>{friend.email}</Typography>
              <Typography>{friend.role}</Typography>
            </div>
          ))}
        </div>
      )}

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
    </Box>
  );
};
