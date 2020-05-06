import { Component } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { AuthService } from "src/app/core/services/Auth.service";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }
  logIn() {
    if (this.loginForm.valid) {
      this.ngxService.startLoader("main-loader");

      let username = this.loginForm.get("username").value;
      let password = this.loginForm.get("password").value;

      this.authService
        .logIn(username, password)
        .pipe(
          finalize(() => {
            this.ngxService.stopLoader("main-loader");
          })
        )
        .subscribe((response) => {
          localStorage.setItem("user", JSON.stringify(response));
          this.router.navigate(["/home"]);
        });
    }
  }
}
