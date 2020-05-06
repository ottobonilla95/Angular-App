import { HomeComponent } from "./pages/home/home.component";
import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";

const routes: Route[] = [
  {
    path: "",
    children: [{ path: "", pathMatch: "full", component: HomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
