import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private client: HttpClient, private router: Router) {}

  logIn(username: string, password: string): Observable<User> {
    return this.client.post<User>(environment.baseUrl + "auth/login", {
      username,
      password,
    });
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<User> {
    return this.client.post<User>(environment.baseUrl + "auth/register", {
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

  refreshToken(refreshToken: string): Observable<User> {
    return this.client.post<User>(
      environment.baseUrl + "auth/refresh?refreshToken=" + refreshToken,
      {}
    );
  }

  logOut() {
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }
}
