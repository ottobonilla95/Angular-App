import { UserToken } from "src/app/core/models/user.model";
import { AuthActions } from "./auth.actions";
import { LOGIN_FINISHED } from "./auth.types";

export interface IState {
  userToken: UserToken;
}

export function AuthReducer(state, action: AuthActions) {
  switch (action.type) {
    case LOGIN_FINISHED:
      return { ...state, userToken: action.payload };
    default:
      return state;
  }
}
