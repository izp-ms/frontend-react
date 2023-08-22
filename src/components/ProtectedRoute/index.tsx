import { Navigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

type Props = {
  children: JSX.Element;
};

export const ProtectedRoute = (props: Props) => {
  const { children } = props;
  const { token } = useToken();

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};
