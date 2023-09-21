import jwt_decode from "jwt-decode";
import { ID, EMAIL, NAME, ROLE } from "../core/config";
import { CurrentUser } from "../models/user";

export const removeJwtToken = () => {
  sessionStorage.removeItem("token");
};

export const getCurrentUser = (): CurrentUser | undefined => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return undefined;
  }

  const decoded: Record<string, string> = jwt_decode(token);
  return {
    id: decoded[ID],
    email: decoded[EMAIL],
    name: decoded[NAME],
    role: decoded[ROLE],
  };
};
