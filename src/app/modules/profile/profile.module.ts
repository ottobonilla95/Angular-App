import { NgModule } from "@angular/core";
import { ProfileRoutingModule } from "./profile.routing";

import { ProfileHomeComponent } from "./pages/home/profile-home.component";

import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ProfileHomeComponent],
  imports: [ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
