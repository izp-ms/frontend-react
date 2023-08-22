import jwt_decode from "jwt-decode";
import { CurrentUser } from "../models/current-user";
import { ID, EMAIL, NAME, ROLE } from "../core/config";

export const logout = () => {
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
