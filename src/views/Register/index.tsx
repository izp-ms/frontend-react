import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

export const Register = () => {
  const navigate = useNavigate();

  const handleMoveToLoginView = (): void => {
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div>
        Already have an account?{" "}
        <span onClick={handleMoveToLoginView}>Login</span>
      </div>
    </div>
  );
};
