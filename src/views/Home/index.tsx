import Button from "@mui/material/Button";
import "./index.scss";
import { useGetUsersQuery } from "../../services/user.service";
import { getCurrentUser } from "../../services/auth.service";
import { AddButton } from "../../components/AddButton";
import { useTypedSelector } from "../../store";

export const Home = () => {
  const { data, error, isLoading, refetch } = useGetUsersQuery();

  const user = useTypedSelector((state) => state.auth.user);

  return (
    <div className="home">
      <h1 className="home_h">Home </h1>
      <h2 className="home">{user.name}</h2>
      <Button
        variant="contained"
        onClick={() => {
          refetch();
          console.log(getCurrentUser());
        }}
      >
        Hello World
      </Button>
      <AddButton />
    </div>
  );
};
