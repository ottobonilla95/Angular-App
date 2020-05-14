import { Album } from "src/app/shared/models/album.model";
import { AlbumActions } from "./album.actions";
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
import * as _ from "lodash";

export interface IState {
  albums: Album[];
  loading: Boolean;
}
const initalState: IState = {
  albums: [],
  loading: false,
};

export function AlbumReducer(state = initalState, action: AlbumActions) {
  switch (action.type) {
    case LOAD_ALBUM:
      var newAlbuums: Album[] = _.remove([...state.albums], function (album) {
        return album.id != action.payload.id;
      });
      newAlbuums.push(action.payload);
      return { ...state, albums: newAlbuums };

    case DELETE_ALBUM:
      var newAlbuums: Album[] = _.remove([...state.albums], function (album) {
        return album.id != action.payload;
      });

      return { ...state, albums: newAlbuums };
    case LOAD_ALBUMS:
      return { ...state, albums: action.payload };

    case LOAD_SONG:
      var albumId = action.payload.albumId;
      var songId = action.payload.id;

      var fatherAlbum: Album;

      state.albums.forEach((album) => {
        if (album.id == albumId) {
          fatherAlbum = { ...album };
        }
      });

      fatherAlbum.songs = _.remove([...fatherAlbum.songs], function (song) {
        return song.id != songId;
      });

      fatherAlbum.songs.push(action.payload);

      var finalAlbums: Album[] = _.remove([...state.albums], function (album) {
        return album.id != albumId;
      });

      finalAlbums.push(fatherAlbum);

      return { ...state, albums: finalAlbums };

    case DELETE_SONG:
      var albumId = action.payload.albumId;
      var songId = action.payload.id;

      var fatherAlbum: Album;

      state.albums.forEach((album) => {
        if (album.id == albumId) {
          fatherAlbum = { ...album };
        }
      });

      fatherAlbum.songs = _.remove([...fatherAlbum.songs], function (song) {
        return song.id != songId;
      });

      var finalAlbums: Album[] = _.remove([...state.albums], function (album) {
        return album.id != albumId;
      });

      finalAlbums.push(fatherAlbum);

      return { ...state, albums: finalAlbums };

    case DELETE_ALL:
      return { ...state, albums: [], loading: false };
    case INIT_LOADER:
      return { ...state, loading: true };
    case STOP_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
}
