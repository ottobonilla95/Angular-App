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
  selector: "app-recover-password",
  templateUrl: "./recover-password.component.html",
  styleUrls: ["./recover-password.component.css"],
})
export class RecoverPasswordComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl("", [Validators.required,  Validators.email]),
    });
  }

  recover() {
    if (this.form.valid) {
      this.ngxService.startLoader("main-loader");

      let email = this.form.get("email").value;

      this.authService
        .recover(email)
        .pipe(
          finalize(() => {
            this.ngxService.stopLoader("main-loader");
          })
        )
        .subscribe((response) => {
          this.router.navigate(["/login"]);
        });
    }
  }
}
