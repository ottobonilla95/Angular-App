import { ActionReducerMap } from "@ngrx/store";

import * as userToken from "../auth/store/auth.reducers";
import * as profile from "../modules/profile/store/profile.reducers";
import * as album from "../modules/album/store/album.reducers";

export interface AppState {
  userToken: userToken.IState;
  profile: profile.IState;
  album: album.IState;
}

export const appReducer: ActionReducerMap<AppState> = {
  userToken: userToken.AuthReducer,
  profile: profile.ProfileReducer,
  album: album.AlbumReducer,
};
