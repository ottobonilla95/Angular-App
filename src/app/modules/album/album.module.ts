import { NgModule } from "@angular/core";
import { AlbumHomeComponent } from "./pages/home/album-home.component";
import { AlbumRoutingModule } from "./album.routes";
import { SharedModule } from "../../shared/shared.module";
import { AlbumItemComponent } from "./components/album-item/album-item.component";
import { AlbumNewComponent } from "./pages/new/album-new.component";
import { AlbumEditComponent } from "./pages/edit/album-edit.component";
import { AlbumFormComponent } from "./components/album-form/album-form.component";
import { AlbumDetailComponent } from "./pages/detail/album-detail.component";
import { SongModalComponent } from "./components/song-modal/song-modal.component";

@NgModule({
  declarations: [
    AlbumHomeComponent,
    AlbumItemComponent,
    AlbumNewComponent,
    AlbumEditComponent,
    AlbumFormComponent,
    AlbumDetailComponent,
    SongModalComponent,
  ],
  entryComponents: [SongModalComponent],

  imports: [AlbumRoutingModule, SharedModule],
})
export class AlbumModule {}
