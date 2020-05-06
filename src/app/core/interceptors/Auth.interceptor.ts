import { Injectable } from "@angular/core";

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

import Swal from "sweetalert2";
import * as moment from "moment";
import { AuthService } from "../services/Auth.service";

import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  private isTokenRefreshing: boolean = false;

  constructor(private authService: AuthService, private client: HttpClient) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;

    if (localStorage.getItem("user")) {
      const user: User = JSON.parse(localStorage.getItem("user"));
      const token: string = user.accessToken;

      if (token) {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${token}`,
          },
        });
      }

      if (this.isTokenRefreshing) {
        this.isTokenRefreshing = false;
        return next.handle(request);
      }

      var expiration = moment(user.expirationDate);

      if (expiration.diff(moment()) < 0) {
        this.isTokenRefreshing = true;
        this.authService
          .refreshToken(user.refreshToken)
          .subscribe((response) => {
            localStorage.setItem("user", JSON.stringify(response));

            request = req.clone({
              setHeaders: {
                authorization: `Bearer ${response.accessToken}`,
              },
            });

            return next.handle(request).pipe(
              tap(
                (response) => {
                  this.handleResponse(response);
                },
                (error) => this.handleError(error)
              )
            );
          });
      }
    }
    return next.handle(request).pipe(
      tap(
        (response) => {
          this.handleResponse(response);
        },
        (error) => this.handleError(error)
      )
    );
  }

  handleResponse(response) {
    let message = undefined;
    if (response.body) {
      message = response.body.message;
    }

    if (message) {
      Swal.fire({
        text: message,
        icon: "info",
        confirmButtonText: "Cool",
      });
    }
  }

  handleError(response) {
    let message = undefined;

    switch (response.status) {
      case 400:
        message = response.error.message;
        break;
      case 401:
        message = response.error.message;
        break;
      case 500:
        message = "Error";
        break;
    }

    if (message) {
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  }
}
