import Button from "@mui/material/Button";
import "./styles.module.scss";
import { useGetUsersQuery } from "../../services/user.service";
import { getCurrentUser } from "../../services/auth.service";
import { useTypedSelector } from "../../store";

export const Profile = () => {
  // const { data, error, isLoading, refetch } = useGetUsersQuery();

  const user = useTypedSelector((state) => state.auth.user);

  return (
    <div className="home">
      <h1 className="home_h">Home </h1>
      <h2 className="home">{user?.name}</h2>
      <Button
        variant="contained"
        onClick={() => {
          // refetch();
          console.log(getCurrentUser());
          console.log(user);
        }}
      >
        Hello World
      </Button>
    </div>
  );
};
