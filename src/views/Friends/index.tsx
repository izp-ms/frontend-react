import React, { useEffect, useState } from "react";
import {
  Box,
  TablePagination,
  Typography,
  Avatar,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useTypedSelector } from "../../store";
import styles from "./styles.module.scss";
import {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetFriendsQuery,
} from "../../services/friend.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import profile from "../../assets/png/default-profile.png";

export const FriendsPage = () => {
  const user = useTypedSelector((state) => state.auth.user);

  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const [search, setSearch] = useState<string>("");

  const { data: friendsData, refetch: friendsRefetch } = useGetFriendsQuery(
    {
      searchParams: searchParams.toString(),
    },
    {
      skip: !user?.id,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: followersData, refetch: followersRefetch } =
    useGetFollowersQuery(
      {
        searchParams: searchParams.toString(),
      },
      {
        skip: !user?.id,
        refetchOnMountOrArgChange: true,
      }
    );

  const { data: followingData, refetch: followingRefetch } =
    useGetFollowingQuery(
      {
        searchParams: searchParams.toString(),
      },
      {
        skip: !user?.id,
        refetchOnMountOrArgChange: true,
      }
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

  const handleChangeTab = (newValue: number) => {
    setPageNumber(1);
    switch (newValue) {
      case 0:
        friendsRefetch();
        break;
      case 1:
        followersRefetch();
        break;
      case 2:
        followingRefetch();
        break;
    }
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

  const navigate = useNavigate();

  useEffect(() => {
    if (search === "") {
      searchParams.delete("Search");
      setSearchParams(searchParams);
      return;
    }
    searchParams.set("Search", search);
    setSearchParams(searchParams);
  }, [search, searchParams, setSearchParams]);

  return (
    <Box
      className={styles.container}
      sx={{ color: "text.primary", marginTop: 10 }}
    >
      <Tabs value={currentTab} centered>
        <Tab
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            fontStyle: "normal",
            letterSpacing: "0px",
            fontFamily: "Rubik",
          }}
          label="Users"
          onClick={() => handleChangeTab(0)}
        />
        <Tab
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            fontStyle: "normal",
            letterSpacing: "0px",
            fontFamily: "Rubik",
          }}
          label="Followers"
          onClick={() => handleChangeTab(1)}
        />
        <Tab
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            fontStyle: "normal",
            letterSpacing: "0px",
            fontFamily: "Rubik",
          }}
          label="Following"
          onClick={() => handleChangeTab(2)}
        />
      </Tabs>

      <h2>Search by user Name</h2>
      <TextField
        label="Search"
        variant="outlined"
        onChange={(e) => setSearch(e.target.value)}
      />

      {currentTab === 0 && (
        <div className={styles.grid}>
          {friendsData?.content.map((friend) => (
            <div
              key={friend.id}
              className={styles.friendCard}
              onClick={() => {
                navigate(`/friends/${friend.id}`);
              }}
            >
              <Avatar src={profile} alt={friend.nickName} />
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
                  fontWeight: "300",
                  fontStyle: "normal",
                  letterSpacing: "0px",
                  fontFamily: "Rubik",
                }}
              >
                {friend.email}
              </Typography>
              <Typography>{friend.role}</Typography>
            </div>
          ))}
        </div>
      )}

      {currentTab === 1 && (
        <div className={styles.grid}>
          {followersData?.content.map((friend) => (
            <div
              key={friend.id}
              className={styles.friendCard}
              onClick={() => {
                navigate(`/friends/${friend.id}`);
              }}
            >
              <Avatar src={profile} alt={friend.nickName} />
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
                  fontWeight: "300",
                  fontStyle: "normal",
                  letterSpacing: "0px",
                  fontFamily: "Rubik",
                }}
              >
                {friend.email}
              </Typography>
              <Typography>{friend.role}</Typography>
            </div>
          ))}
        </div>
      )}

      {currentTab === 2 && (
        <div className={styles.grid}>
          {followingData?.content.map((friend) => (
            <div
              key={friend.id}
              className={styles.friendCard}
              onClick={() => {
                navigate(`/friends/${friend.id}`);
              }}
            >
              <Avatar src={profile} alt={friend.nickName} />
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
                  fontWeight: "300",
                  fontStyle: "normal",
                  letterSpacing: "0px",
                  fontFamily: "Rubik",
                }}
              >
                {friend.email}
              </Typography>
              <Typography>{friend.role}</Typography>
            </div>
          ))}
        </div>
      )}

      {currentTab === 0 && (
        <TablePagination
          className={styles.pagination}
          component="div"
          count={friendsData?.totalCount ?? 0}
          page={pageNumber - 1}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
        />
      )}

      {currentTab === 1 && (
        <TablePagination
          className={styles.pagination}
          component="div"
          count={followersData?.totalCount ?? 0}
          page={pageNumber - 1}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
        />
      )}

      {currentTab === 2 && (
        <TablePagination
          className={styles.pagination}
          component="div"
          count={followingData?.totalCount ?? 0}
          page={pageNumber - 1}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
        />
      )}
    </Box>
  );
};
