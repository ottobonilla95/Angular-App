import { AlbumHomeComponent } from "./pages/home/album-home.component";
import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { AlbumNewComponent } from "./pages/new/album-new.component";
import { AlbumEditComponent } from "./pages/edit/album-edit.component";
import { AlbumDetailComponent } from './pages/detail/album-detail.component';

const routes: Route[] = [
  {
    path: "",
    children: [
      { path: "", pathMatch: "full", component: AlbumHomeComponent },
      { path: "new", component: AlbumNewComponent },
      { path: "edit/:id", component: AlbumEditComponent },
      { path: "detail/:id", component: AlbumDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumRoutingModule {}
