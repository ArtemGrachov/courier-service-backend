import type { ERoles } from "src/constants/auth";

export interface IUserData {
  id: number;
  email: string;
  role: ERoles;
}

