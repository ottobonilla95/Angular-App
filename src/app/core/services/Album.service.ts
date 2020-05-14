import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, defer } from "rxjs";
import { Album } from "src/app/shared/models/album.model";
import { CustomResponse } from "src/app/shared/models/custom-response.model";

import { Store } from "@ngrx/store";
import * as albumActions from "../../modules/album/store/album.actions";
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AlbumService {
  constructor(private client: HttpClient, private store: Store) {}

  get(id: number): Observable<Album> {
    return defer(() => {
      this.store.dispatch(new albumActions.InitLoader());
      return this.client.get<Album>(environment.baseUrl + `album/${id}`);
    }).pipe(
      finalize(() => {
        this.store.dispatch(new albumActions.StopLoader());
      })
    );
  }

  delete(id: string): Observable<any> {
    return defer(() => {
      this.store.dispatch(new albumActions.InitLoader());
      return this.client.delete<any>(environment.baseUrl + `album/${id}`);
    }).pipe(
      finalize(() => {
        this.store.dispatch(new albumActions.StopLoader());
      })
    );
  }

  getAll(): Observable<Album[]> {
    return defer(() => {
      this.store.dispatch(new albumActions.InitLoader());
      return this.client.get<Album[]>(environment.baseUrl + "album");
    }).pipe(
      finalize(() => {
        this.store.dispatch(new albumActions.StopLoader());
      })
    );
  }
  saveAlbum(album: Album): Observable<CustomResponse<Album>> {
    return defer(() => {
      this.store.dispatch(new albumActions.InitLoader());
      return this.client
        .post<CustomResponse<Album>>(environment.baseUrl + "album", {
          name: album.name,
          description: album.description,
          image: album.image,
          userId: album.userId,
        })
        .pipe(
          finalize(() => {
            this.store.dispatch(new albumActions.StopLoader());
          })
        );
    });
  }

  editAlbum(album: Album): Observable<CustomResponse<Album>> {
    return defer(() => {
      this.store.dispatch(new albumActions.InitLoader());
      return this.client
        .put<CustomResponse<Album>>(environment.baseUrl + "album", {
          id: album.id,
          name: album.name,
          description: album.description,
          image: album.image,
        })
        .pipe(
          finalize(() => {
            this.store.dispatch(new albumActions.StopLoader());
          })
        );
    });
  }
}
