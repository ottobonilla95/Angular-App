import { Component } from "@angular/core";
import { PlayAppService } from "src/app/core/services/PlayApp.service";
import { UserProfile } from "../../../../shared/models/user-profile.model";

///Store
import * as reducers from "../../../../store/app.reducer";
import { Store } from "@ngrx/store";
import * as profileActions from "../../store/profile.actions";

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { UserToken } from "src/app/core/models/user.model";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-profile-home",
  templateUrl: "./profile-home.component.html",
  styleUrls: ["./profile-home.component.css"],
})
export class ProfileHomeComponent {
  user: UserProfile;
  loading: Boolean;
  image: string;

  profileForm: FormGroup;
  constructor(
    private playAppService: PlayAppService,
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private store: Store<reducers.AppState>
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
    });
    this.store.select("profile").subscribe((profile) => {
      this.loading = profile.loading;

      if (profile.userProfile) {
        this.user = profile.userProfile;
        this.profileForm.controls.username.setValue(
          profile.userProfile.username
        );
        this.profileForm.controls.email.setValue(profile.userProfile.email);
      }
    });
  }

  saveImage(croppedImage) {
    this.image = croppedImage;
  }

  saveAll() {
    if (this.profileForm.valid) {
      let finalUser: UserProfile = new UserProfile();
      finalUser.username = this.profileForm.get("username").value;
      finalUser.email = this.profileForm.get("email").value;
      finalUser.profileImage = this.image;

      this.ngxService.stopLoader("main-loader");

      this.playAppService
        .saveUser(finalUser)
        .pipe(
          finalize(() => {
            this.ngxService.stopLoader("main-loader");
          })
        )
        .subscribe((response) => {
          this.store.dispatch(new profileActions.LoadProfile(response.user));
        });
    }
  }
}
