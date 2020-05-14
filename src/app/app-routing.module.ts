import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";

import { NotFoundComponent } from "./layout/not-found/not-found.component";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";

import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { RecoverPasswordComponent } from "./auth/recover-password/recover-password.component";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Route[] = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    children: [
      { path: "profile", loadChildren: "./modules/profile/profile.module#ProfileModule" },
      { path: "home", loadChildren: "./modules/home/home.module#HomeModule" },
      {
        path: "album",
        loadChildren: "./modules/album/album.module#AlbumModule",
      },
      { path: "", pathMatch: "full", redirectTo: "home" },
    ],
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "recoverpassword", component: RecoverPasswordComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
