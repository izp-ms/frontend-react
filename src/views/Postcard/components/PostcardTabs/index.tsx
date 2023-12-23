import { Tabs, Tab } from "@mui/material";

export type PostcardTab =
  | "postcards-to-send"
  | "my-postcards"
  | "my-collection"
  | "all-postcards";

interface Props {
  currentTab: PostcardTab;
  handleChangeTab: (_event: React.SyntheticEvent, newTab: PostcardTab) => void;
}

export const PostcardTabs = (props: Props) => {
  const { currentTab, handleChangeTab } = props;
  return (
    <Tabs value={currentTab} onChange={handleChangeTab}>
      <Tab
        sx={{
          fontSize: "16px",
          fontWeight: "400",
          fontStyle: "normal",
          letterSpacing: "0px",
          fontFamily: "Rubik",
        }}
        value="postcards-to-send"
        label="Postcards to send"
      />
      <Tab
        sx={{
          fontSize: "16px",
          fontWeight: "400",
          fontStyle: "normal",
          letterSpacing: "0px",
          fontFamily: "Rubik",
        }}
        value="my-postcards"
        label="My Postcards"
      />
      <Tab
        sx={{
          fontSize: "16px",
          fontWeight: "400",
          fontStyle: "normal",
          letterSpacing: "0px",
          fontFamily: "Rubik",
        }}
        value="my-collection"
        label="My Collection"
      />
      <Tab
        sx={{
          fontSize: "16px",
          fontWeight: "400",
          fontStyle: "normal",
          letterSpacing: "0px",
          fontFamily: "Rubik",
        }}
        value="all-postcards"
        label="All postcards"
      />
    </Tabs>
  );
};
