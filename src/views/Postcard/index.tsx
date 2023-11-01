import { Box } from "@mui/material";
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

  const { data: paginatedData, refetch } = useGetPostcardsQuery({
    searchParams: searchParams.toString(),
  });

  const [tabName, setTabName] = useState<PostcardTab>("my-postcards");

  useEffect(() => {
    searchParams.set("UserId", user?.id ?? "0");
    searchParams.set("PageSize", "10");
    searchParams.set("PageNumber", "1");

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, user?.id]);

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
      <div>pagination</div>
    </Box>
  );
};
