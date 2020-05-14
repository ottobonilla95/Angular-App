import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { UserToken } from "../models/user.model";
import { Router } from "@angular/router";

///Store
import * as reducers from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import * as albumActions from "../../modules/album/store/album.actions";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private client: HttpClient,
    private router: Router,
    private store: Store<reducers.AppState>
  ) {}

  logIn(username: string, password: string): Observable<UserToken> {
    return this.client.post<UserToken>(environment.baseUrl + "auth/login", {
      username,
      password,
    });
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<UserToken> {
    return this.client.post<UserToken>(environment.baseUrl + "auth/register", {
      username,
      email,
      password,
    });
  }

  recover(email: string): Observable<any> {
    return this.client.post<any>(
      environment.baseUrl + `auth/recover?email=${email}`,
      {}
    );
  }

  refreshToken(refreshToken: string): Observable<UserToken> {
    return this.client.post<UserToken>(
      environment.baseUrl + "auth/refresh?refreshToken=" + refreshToken,
      {}
    );
  }

  logOut() {
    localStorage.removeItem("user");

    this.router.navigate(["/login"]);
    this.store.dispatch(new albumActions.DeleteAll());
  }
}
