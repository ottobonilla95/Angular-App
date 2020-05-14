import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ProfileHomeComponent } from './pages/home/profile-home.component';

const routes: Route[] = [{
    path:'',
    children:[
        {
            path:'', pathMatch:'full',
            component:ProfileHomeComponent
        }
    ]    
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class ProfileRoutingModule {}
