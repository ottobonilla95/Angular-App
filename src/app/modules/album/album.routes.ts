import { AlbumHomeComponent } from "./pages/home/album-home.component";
import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";

const routes: Route[] = [
  {
    path: "",
    children: [{ path: "", pathMatch: "full", component: AlbumHomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumRoutingModule {}
