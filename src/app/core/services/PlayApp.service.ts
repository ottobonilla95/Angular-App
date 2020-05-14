import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable, defer } from "rxjs";
import { MenuItem } from "../models/menuitem.model";
import { UserProfile } from "src/app/shared/models/user-profile.model";
import { finalize } from "rxjs/operators";

import { Store } from "@ngrx/store";
import * as profileActions from "../../modules/profile/store/profile.actions";

@Injectable({
  providedIn: "root",
})
export class PlayAppService {
  constructor(private client: HttpClient, private store: Store) {}

  getUser(): Observable<UserProfile> {
    return defer(() => {
      this.store.dispatch(new profileActions.InitLoader());
      return this.client.get<UserProfile>(
        environment.baseUrl + "playapp/GetUserProfile",
        {}
      );
    });
  }

  saveUser(user: UserProfile): Observable<any> {
    return defer(() => {
      this.store.dispatch(new profileActions.InitLoader());
      return this.client
        .post<any>(environment.baseUrl + "playapp/SaveUserProfile", {
          id: user.id,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
        })
        .pipe(
          finalize(() => {
            this.store.dispatch(new profileActions.StopLoader());
          })
        );
    });
  }

  getMenu(): Observable<MenuItem[]> {
    return this.client.get<MenuItem[]>(
      environment.baseUrl + "playapp/getmenu",
      {}
    );
  }
}
