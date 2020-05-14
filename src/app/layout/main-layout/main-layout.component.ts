import { Component } from "@angular/core";
import { PlayAppService } from "src/app/core/services/PlayApp.service";
import { MenuItem } from "src/app/core/models/menuitem.model";
import { AuthService } from "src/app/core/services/Auth.service";
import { UserToken } from "src/app/core/models/user.model";

import * as _ from "lodash";

import { Store } from "@ngrx/store";
import * as reducers from "../../store/app.reducer";
import * as profileActions from "../../modules/profile/store/profile.actions";

import { UserProfile } from "src/app/shared/models/user-profile.model";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"],
})
export class MainLayoutComponent {
  finalMenu: MenuItem[] = [];
  user: UserToken;
  userProfile: UserProfile;

  constructor(
    private playAppService: PlayAppService,
    private authService: AuthService,
    private store: Store<reducers.AppState>
  ) {}

  ngOnInit(): void {
    this.playAppService.getMenu().subscribe((response) => {
      this.renderMenu(response);
    });

    this.store.select("profile").subscribe((profile) => {
      this.userProfile = profile.userProfile;
    });

    this.playAppService.getUser().subscribe((response) => {
      this.store.dispatch(new profileActions.LoadProfile(response));
    });

    this.user = JSON.parse(localStorage.getItem("user"));
  }

  renderMenu(menu: MenuItem[]) {
    while (menu.length > 0) {
      menu.forEach((menuItem) => {
        menuItem.children = [];

        if (!menuItem.menuFatherId) {
          const index: number = menu.indexOf(menuItem);
          if (index !== -1) {
            menu.splice(index, 1);
          }
          menuItem.opacity = 0;
          this.finalMenu.push(menuItem);
        } else {
          const father = menuItem.menuFatherId;

          this.serachFather(this.finalMenu, father, menuItem, menu);
        }
      });
    }
    this.finalMenu = this.sortItems(this.finalMenu);
  }

  sortItems(menu: MenuItem[]) {
    if (menu.length > 0) {
      menu = _.sortBy(menu, ["sequence"]);

      menu.forEach((menuItem) => {
        menuItem.children = this.sortItems(menuItem.children);
      });
    }

    return menu;
  }

  serachFather(menuArray: MenuItem[], father, menuItem: MenuItem, menu) {
    menuArray.forEach((menuPainted) => {
      if (menuPainted.id === father) {
        menuItem.opacity = menuPainted.opacity + 1;
        menuPainted.children.push(menuItem);

        const index: number = menu.indexOf(menuItem);
        if (index !== -1) {
          menu.splice(index, 1);
        }
      } else {
        this.serachFather(menuPainted.children, father, menuItem, menu);
      }
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
