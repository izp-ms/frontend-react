import { Navigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { useTypedSelector } from "../../store";

type Props = {
  children: JSX.Element;
};

export const AdminRoute = (props: Props) => {
  const { children } = props;
  const { token } = useToken();
  const user = useTypedSelector((state) => state.auth.user);

  if (!token || !user?.role || user.role !== "ADMIN") {
    return <Navigate to="/login" />;
  }
  return children;
};
