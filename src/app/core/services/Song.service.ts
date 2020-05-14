import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, defer } from "rxjs";
import { CustomResponse } from "src/app/shared/models/custom-response.model";

import { Store } from "@ngrx/store";
import * as albumActions from "../../modules/album/store/album.actions";
import { finalize } from "rxjs/operators";
import { Song } from "src/app/shared/models/song.model";

@Injectable({
  providedIn: "root",
})
export class SongService {
  constructor(private client: HttpClient, private store: Store) {}

  delete(id: string): Observable<any> {
    return defer(() => {
      this.store.dispatch(new albumActions.InitLoader());
      return this.client.delete<any>(environment.baseUrl + `song/${id}`);
    }).pipe(
      finalize(() => {
        this.store.dispatch(new albumActions.StopLoader());
      })
    );
  }

  saveSong(song: Song): Observable<CustomResponse<Song>> {
    return defer(() => {
      this.store.dispatch(new albumActions.InitLoader());
      return this.client
        .post<CustomResponse<Song>>(environment.baseUrl + "song", {
          url: song.url,
          albumId: song.albumId,
        })
        .pipe(
          finalize(() => {
            this.store.dispatch(new albumActions.StopLoader());
          })
        );
    });
  }

  updateSong(song: Song): Observable<CustomResponse<Song>> {
    return defer(() => {
      this.store.dispatch(new albumActions.InitLoader());
      return this.client
        .put<CustomResponse<Song>>(environment.baseUrl + "song", {
          id: song.id,
          url: song.url,
        })
        .pipe(
          finalize(() => {
            this.store.dispatch(new albumActions.StopLoader());
          })
        );
    });
  }
}
