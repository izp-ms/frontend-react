import { Box, TablePagination } from "@mui/material";
import { useTypedSelector } from "../../store";
import styles from "./styles.module.scss";
import { PostcardTab, PostcardTabs } from "./components/PostcardTabs";
import { HorizontalDivider } from "../../components/HorizontalDivider";
import { useGetPostcardsQuery } from "../../services/postcard.service";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MyPostcards } from "./components/MyPostcards";

export const PostcardsPage = () => {
  const user = useTypedSelector((state) => state.auth.user);

  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data: paginatedData, refetch } = useGetPostcardsQuery({
    searchParams: searchParams.toString(),
  });

  const [tabName, setTabName] = useState<PostcardTab>("my-postcards");

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
    searchParams.set("UserId", user?.id ?? "0");
    searchParams.set("PageSize", pageSize.toString());
    searchParams.set("PageNumber", pageNumber.toString());

    setSearchParams(searchParams);
  }, [pageNumber, pageSize, searchParams, setSearchParams, user?.id]);

  const renderPostcardContent = () => {
    switch (tabName) {
      case "postcards-to-send":
        return <div>postcards-to-send</div>;
      case "my-postcards":
        return <MyPostcards postcards={paginatedData?.content ?? []} />;
      case "my-collection":
        return <div>my-collection</div>;
      case "all-postcards":
        return <div>all-postcards</div>;
    }
  };

  return (
    <Box className={styles.container} sx={{ color: "text.primary" }}>
      <div className={styles.tabs}>
        <PostcardTabs currentTab={tabName} setTabName={setTabName} />
      </div>
      <HorizontalDivider />
      <div>filters</div>
      <div>{renderPostcardContent()}</div>
      <TablePagination
        className={styles.pagination}
        component="div"
        count={paginatedData?.totalCount ?? 0}
        page={pageNumber - 1}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[2, 3, 10, 25, 50]}
      />
    </Box>
  );
};
