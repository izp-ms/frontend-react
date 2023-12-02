import { Box, Button, TablePagination } from "@mui/material";
import { useTypedSelector } from "../../store";
import styles from "./styles.module.scss";
import { PostcardTab, PostcardTabs } from "./components/PostcardTabs";
import { HorizontalDivider } from "../../components/HorizontalDivider";
import { useGetPostcardsQuery } from "../../services/postcard.service";
import { useGetPostcardsDataQuery } from "../../services/postcard-data.service";
import { useSearchParams } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import { PostcardsComponent } from "./components/PostcardsComponent";
import { PostcardsDataComponent } from "./components/PostcardsDataComponent";
import { Input } from "@mui/material";

export const PostcardsPage = () => {
  const user = useTypedSelector((state) => state.auth.user);

  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data: paginatedData, refetch: postcardsRefetch } =
    useGetPostcardsQuery(
      {
        searchParams: searchParams.toString(),
      },
      { skip: !user?.id, refetchOnMountOrArgChange: true }
    );

  const { data: paginatedData2, refetch: postcardsDataRefetch } =
    useGetPostcardsDataQuery(
      {
        searchParams: searchParams.toString(),
      },
      { skip: !user?.id, refetchOnMountOrArgChange: true }
    );

  const [tabName, setTabName] = useState<PostcardTab>("my-postcards");
  const [searchInput, setSearchInput] = useState("");

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(newPage);
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
    searchParams.set("UserId", user?.id ?? "0");
    searchParams.set("PageNumber", pageNumber.toString());
    searchParams.set("PageSize", pageSize.toString());
    searchParams.set("IsSent", "true");
    setSearchParams(searchParams);
  }, [pageNumber, pageSize, searchParams, setSearchParams, user?.id]);

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
    //setSearchParams(searchParams);
  };
  const handleChangeSearch = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchInput(event.target.value);
  };
  const handleClickSearch = () => {
    if (searchInput === "") {
      searchParams.delete("Search");
    } else {
      searchParams.set("Search", searchInput);
    }
  };

  const renderPostcardContent = () => {
    switch (tabName) {
      case "postcards-to-send":
        return (
          <div>
            <div>Postcards To Send </div>
            <PostcardsComponent postcards={paginatedData?.content ?? []} />
          </div>
        );
      case "my-postcards":
        return (
          <div>
            <div>My Postcard</div>
            <PostcardsComponent postcards={paginatedData?.content ?? []} />
          </div>
        );
      case "my-collection":
        return (
          <div>
            <div>My Collection</div>
            <PostcardsDataComponent
              postcards={paginatedData2?.content ?? []}
              user={user?.id ?? "0"}
            />
          </div>
        );
      case "all-postcards":
        return (
          <div>
            <div>All Postcards</div>
            <PostcardsDataComponent postcards={paginatedData2?.content ?? []} />
          </div>
        );
    }
  };

  return (
    <Box className={styles.container} sx={{ color: "text.primary" }}>
      <div className={styles.tabs}>
        <PostcardTabs currentTab={tabName} handleChangeTab={handleChangeTab} />
      </div>
      <HorizontalDivider />

      <div>filters</div>
      <div>
        Search:
        <Input
          placeholder="Enter phrase"
          onChange={handleChangeSearch}
          value={searchInput}
        />
        <span
          className={styles.update}
          onClick={() => {
            postcardsRefetch();
            postcardsDataRefetch();
            handleClickSearch();
          }}
        >
          <Button variant="contained" className={styles.btn}>
            Search
          </Button>
        </span>
      </div>

      <div className={styles.postcard}>
        <div>{renderPostcardContent()}</div>
      </div>

      <TablePagination
        className={styles.pagination}
        component="div"
        count={paginatedData2?.totalCount ?? 0}
        page={pageNumber - 1}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[2, 3, 10, 25, 50]}
      />
    </Box>
  );
};
