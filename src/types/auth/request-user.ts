import type { ERoles } from "src/constants/auth";

export interface IRequstUser {
  id: number;
  email: string;
  role: ERoles;
  authUuid: string;
}

