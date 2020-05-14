import { UserProfile } from "../../../shared/models/user-profile.model";

import { ProfileActions } from "./profile.actions";
import { LOAD_PROFILE, INIT_LOADER, STOP_LOADER } from "./profile.types";

export interface IState {
  userProfile: UserProfile;
  loading: Boolean;
}

const initialState: IState = {
  userProfile: undefined,
  loading: false,
};
export function ProfileReducer(state = initialState, action: ProfileActions) {
  switch (action.type) {
    case LOAD_PROFILE:
      return { ...state, userProfile: action.payload, loading: false };
    case INIT_LOADER:
      return { ...state, loading: true };
    case STOP_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
}
