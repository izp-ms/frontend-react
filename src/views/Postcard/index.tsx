import { Box, TablePagination } from "@mui/material";
import { useTypedSelector } from "../../store";
import styles from "./styles.module.scss";
import { PostcardTab, PostcardTabs } from "./components/PostcardTabs";
import { HorizontalDivider } from "../../components/HorizontalDivider";
import { useGetPostcardsQuery } from "../../services/postcard.service";
import { useGetPostcardsDataQuery } from "../../services/postcard-data.service";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostcardsComponent } from "./components/PostcardsComponent";
import { PostcardsDataComponent } from "./components/PostcardsDataComponent";
import { Filters } from "./components/Filters";
import LoadingSpinner from "../../components/LoadingSpinner";

export const PostcardsPage = () => {
  const user = useTypedSelector((state) => state.auth.user);

  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const {
    data: paginatedDataForPostcards,
    refetch: postcardsRefetch,
    isFetching: isPostcardsFetching,
  } = useGetPostcardsQuery(
    {
      searchParams: searchParams.toString(),
    },
    { skip: !user?.id, refetchOnMountOrArgChange: true }
  );

  const {
    data: paginatedDataForPostcardsData,
    refetch: postcardsDataRefetch,
    isFetching: isPostcardsDataFetching,
  } = useGetPostcardsDataQuery(
    {
      searchParams: searchParams.toString(),
    },
    { skip: !user?.id, refetchOnMountOrArgChange: true }
  );

  const [tabName, setTabName] = useState<PostcardTab>("my-postcards");

  const [paginatedDataCount, setpaginatedDataCount] = useState<number>(0);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage + 1);
    postcardsRefetch();
    postcardsDataRefetch();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(1);
    postcardsRefetch();
    postcardsDataRefetch();
  };

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    searchParams.set("PageNumber", pageNumber.toString());
    searchParams.set("PageSize", pageSize.toString());
    setSearchParams(searchParams);
    if (tabName === "postcards-to-send" || tabName === "my-postcards") {
      setpaginatedDataCount(paginatedDataForPostcards?.totalCount ?? 0);
    } else {
      setpaginatedDataCount(paginatedDataForPostcardsData?.totalCount ?? 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize, searchParams, setSearchParams, user?.id]);

  useEffect(() => {
    if (
      paginatedDataForPostcards?.totalCount !== 0 &&
      paginatedDataCount !== undefined
    ) {
      setpaginatedDataCount(paginatedDataForPostcards?.totalCount ?? 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginatedDataForPostcards]);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    setpaginatedDataCount(paginatedDataForPostcards?.totalCount ?? 0);
    searchParams.set("PageNumber", pageNumber.toString());
    searchParams.set("PageSize", pageSize.toString());
    searchParams.set("UserId", user?.id ?? "0");
    searchParams.set("IsSent", "true");
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleChangeTab = (
    _event: React.SyntheticEvent,
    newTab: PostcardTab
  ) => {
    setTabName(newTab);
    setPageNumber(1);
    if (newTab === "postcards-to-send") {
      searchParams.set("UserId", user?.id ?? "0");
      searchParams.set("IsSent", "false");
    } else if (newTab === "my-postcards") {
      searchParams.set("UserId", user?.id ?? "0");
      searchParams.set("IsSent", "true");
    } else if (newTab === "my-collection") {
      searchParams.delete("UserId");
      searchParams.delete("IsSent");
    } else if (newTab === "all-postcards") {
      searchParams.delete("UserId");
      searchParams.delete("IsSent");
    }
    searchParams.delete("Search");
    setSearchParams(searchParams);
  };

  const renderPostcardContent = () => {
    switch (tabName) {
      case "postcards-to-send":
        return isPostcardsFetching ? (
          <LoadingSpinner />
        ) : (
          <PostcardsComponent
            postcards={paginatedDataForPostcards?.content ?? []}
            refetch={postcardsRefetch}
          />
        );
      case "my-postcards":
        return isPostcardsFetching ? (
          <LoadingSpinner />
        ) : (
          <PostcardsComponent
            postcards={paginatedDataForPostcards?.content ?? []}
          />
        );
      case "my-collection":
        return isPostcardsDataFetching ? (
          <LoadingSpinner />
        ) : (
          <PostcardsDataComponent
            postcards={paginatedDataForPostcardsData?.content ?? []}
            user={user?.id ?? "0"}
          />
        );
      case "all-postcards":
        return isPostcardsDataFetching ? (
          <LoadingSpinner />
        ) : (
          <PostcardsDataComponent
            postcards={paginatedDataForPostcardsData?.content ?? []}
          />
        );
      default:
        return null;
    }
  };
  return (
    <Box className={styles.container} sx={{ color: "text.primary" }}>
      <div className={styles.tabs}>
        <PostcardTabs currentTab={tabName} handleChangeTab={handleChangeTab} />
      </div>
      <HorizontalDivider />

      <div>
        {tabName === "my-postcards" && <Filters viewType="postcard" />}
        {(tabName === "all-postcards" || tabName === "my-collection") && (
          <Filters viewType="postcardData" />
        )}
      </div>

      <div className={styles.postcard}>
        <div>{renderPostcardContent()}</div>
      </div>

      <TablePagination
        className={styles.pagination}
        component="div"
        count={paginatedDataCount}
        page={pageNumber - 1}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Box>
  );
};
