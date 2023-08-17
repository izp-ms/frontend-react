import Button from "@mui/material/Button";
import "./index.scss";
import { useGetUsersQuery } from "../../services/user.service";
import { useEffect } from "react";

export const Home = () => {
  const { data, error, isLoading, refetch } = useGetUsersQuery();

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div className="home">
      <h1 className="home_h">Home</h1>
      <Button
        variant="contained"
        onClick={() => {
          refetch();
          console.log(isLoading);
          console.log(error);
          console.log(data);
        }}
      >
        Hello World
      </Button>
    </div>
  );
};
