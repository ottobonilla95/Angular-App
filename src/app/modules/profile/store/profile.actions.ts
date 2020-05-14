import { Action } from "@ngrx/store";
import { LOAD_PROFILE, INIT_LOADER, STOP_LOADER } from "./profile.types";
import { UserProfile } from "../../../shared/models/user-profile.model";

export class LoadProfile implements Action {
  readonly type = LOAD_PROFILE;
  constructor(public payload: UserProfile) {}
}

export class InitLoader implements Action {
  readonly type = INIT_LOADER;
}

export class StopLoader implements Action {
  readonly type = STOP_LOADER;
}

export type ProfileActions = LoadProfile | InitLoader | StopLoader;
