import { Component } from "@angular/core";
import { AlbumService } from "src/app/core/services/Album.service";
import { Router } from "@angular/router";

import { Store } from "@ngrx/store";
import * as albumActions from "../../store/album.actions";
import * as reducers from "../../../../store/app.reducer";

@Component({
  selector: "app-album-new",
  templateUrl: "./album-new.component.html",
  styleUrls: ["./album-new.component.css"],
})
export class AlbumNewComponent {
  loading: Boolean;
  constructor(
    private albumService: AlbumService,
    private router: Router,
    private store: Store<reducers.AppState>
  ) {}

  ngOnInit(): void {
    this.store.select("album").subscribe((album) => {
      this.loading = album.loading;
    });
  }

  saveAlbum(album) {
    console.log("sds");
    this.albumService.saveAlbum(album).subscribe((response) => {
      this.store.dispatch(new albumActions.LoadAlbum(response.data));
      this.router.navigate(["/album"]);
    });
  }
}
