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
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  registerform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.registerform = this.fb.group(
      {
        username: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required]),
        confirmpassword: new FormControl("", [Validators.required]),
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls["password"].value ===
      frm.controls["confirmpassword"].value
      ? null
      : { mismatch: true };
  }

  register() {
    if (this.registerform.valid) {
      this.ngxService.startLoader("main-loader");

      let username = this.registerform.get("username").value;
      let email = this.registerform.get("email").value;
      let password = this.registerform.get("password").value;

      this.authService
        .register(username, email, password)
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
