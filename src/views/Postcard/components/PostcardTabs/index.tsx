import { Tabs, Tab } from "@mui/material";

export type PostcardTab =
  | "postcards-to-send"
  | "my-postcards"
  | "my-collection"
  | "all-postcards";

interface Props {
  currentTab: PostcardTab;
  handleChangeTab: (
    _event: React.SyntheticEvent,
    newTab: PostcardTab
  ) => void;
}

export const PostcardTabs = (props: Props) => {
  const { currentTab, handleChangeTab } = props;
  return (
    <Tabs value={currentTab} onChange={handleChangeTab}>
      <Tab value="postcards-to-send" label="Postcards to send" />
      <Tab value="my-postcards" label="My Postcards" />
      <Tab value="my-collection" label="My Collection" />
      <Tab value="all-postcards" label="All postcards" />
    </Tabs>
  );
};
