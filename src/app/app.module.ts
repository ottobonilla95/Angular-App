import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { NotFoundComponent } from "./layout/not-found/not-found.component";

import { MatSidenavModule } from "@angular/material/sidenav";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";
import { ItemListBarComponent } from "./layout/main-layout/item-list-bar/item-list-bar.component";

import { CoreModule } from "./core/core.module";

import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { RecoverPasswordComponent } from "./auth/recover-password/recover-password.component";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainLayoutComponent,
    ItemListBarComponent,
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
