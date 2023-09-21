import Button from "@mui/material/Button";
import "./styles.module.scss";
import { useTypedSelector } from "../../store";

export const Profile = () => {
  const user = useTypedSelector((state) => state.auth.user);

  return (
    <div className="home">
      <h1 className="home_h">Home </h1>
      <h2 className="home">{user?.name}</h2>
      <Button variant="contained">Hello World</Button>
    </div>
  );
};
