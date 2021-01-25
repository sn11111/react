import { User } from "../models/User";

type Nullable<T> = T | null;

export class UserResponse {
  user: Nullable<User>;
  token: Nullable<string>;
}
