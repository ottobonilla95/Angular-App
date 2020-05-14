import { Action } from "@ngrx/store";
import {
  LOAD_ALBUM,
  LOAD_ALBUMS,
  INIT_LOADER,
  STOP_LOADER,
  DELETE_ALBUM,
  LOAD_SONG,
  DELETE_SONG,
  DELETE_ALL,
} from "./album.types";
import { Album } from "src/app/shared/models/album.model";
import { Song } from "src/app/shared/models/song.model";

export class LoadAlbum implements Action {
  readonly type = LOAD_ALBUM;
  constructor(public payload: Album) {}
}
export class DeleteAlbum implements Action {
  readonly type = DELETE_ALBUM;
  constructor(public payload: string) {}
}

export class LoadAlbums implements Action {
  readonly type = LOAD_ALBUMS;
  constructor(public payload: Album[]) {}
}

export class LoadSong implements Action {
  readonly type = LOAD_SONG;
  constructor(public payload: Song) {}
}

export class DeleteSong implements Action {
  readonly type = DELETE_SONG;
  constructor(public payload: Song) {}
}
export class DeleteAll implements Action {
  readonly type = DELETE_ALL;
}

export class InitLoader implements Action {
  readonly type = INIT_LOADER;
}

export class StopLoader implements Action {
  readonly type = STOP_LOADER;
}

export type AlbumActions =
  | LoadAlbum
  | LoadAlbums
  | InitLoader
  | StopLoader
  | DeleteAlbum
  | LoadSong
  | DeleteSong
  | DeleteAll;
