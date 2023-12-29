import React from "react";
import styles from "./styles.module.scss";
import { Box, TablePagination } from "@mui/material";
import { useTypedSelector } from "../../store";
import { useGetPostcardsDataQuery } from "../../services/postcard-data.service";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ModifyPostcard } from "./ModifyPostcard";
import { CreatePostcardData } from "./CreatePostcardData";
import LoadingSpinner from "../../components/LoadingSpinner";

export const AdminPanel = () => {
  const user = useTypedSelector((state) => state.auth.user);

  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const {
    data: paginatedDataForPostcardsData,
    refetch: postcardsDataRefetch,
    isFetching,
  } = useGetPostcardsDataQuery(
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
    await postcardsDataRefetch();
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(1);
    await postcardsDataRefetch();
  };

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    searchParams.set("PageNumber", pageNumber.toString());
    searchParams.set("PageSize", pageSize.toString());
    setSearchParams(searchParams);
  }, [pageNumber, pageSize, searchParams, setSearchParams, user?.id]);

  if (isFetching) {
    return (
      <Box className={styles.container} sx={{ color: "text.primary" }}>
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <Box className={styles.container} sx={{ color: "text.primary" }}>
      <h1>AdminPanel</h1>

      <div className={styles.postcard_list}>
        {paginatedDataForPostcardsData?.content.map((postcard) => (
          <ModifyPostcard
            postcardData={postcard}
            refetch={postcardsDataRefetch}
          />
        ))}
      </div>

      <CreatePostcardData refetch={postcardsDataRefetch} />

      <TablePagination
        className={styles.pagination}
        component="div"
        count={paginatedDataForPostcardsData?.totalCount ?? 0}
        page={pageNumber - 1}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Box>
  );
};
