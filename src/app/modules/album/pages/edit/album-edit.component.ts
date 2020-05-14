import { Component } from "@angular/core";

import { Store } from "@ngrx/store";
import * as albumActions from "../../store/album.actions";
import * as reducers from "../../../../store/app.reducer";

import * as _ from "lodash";

import { Router, ActivatedRoute } from "@angular/router";
import { AlbumService } from "src/app/core/services/Album.service";
import { Album } from "src/app/shared/models/album.model";

@Component({
  selector: "app-album-edit",
  templateUrl: "./album-edit.component.html",
  styleUrls: ["./album-edit.component.css"],
})
export class AlbumEditComponent {
  album: Album;
  loading: Boolean = false;
  constructor(
    private albumService: AlbumService,
    private router: Router,
    private store: Store<reducers.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;

    this.store.select("album").subscribe((album) => {
      this.album = _.find(album.albums, function (album) {
        return album.id == id;
      });
      this.loading = album.loading;
    });

    this.albumService.get(id).subscribe((album) => {
      this.store.dispatch(new albumActions.LoadAlbum(album));
    });
  }

  editAlbum(album) {
    this.albumService.editAlbum(album).subscribe((response) => {
      this.store.dispatch(new albumActions.LoadAlbum(response.data));
      this.router.navigate(["/album"]);
    });
  }
}
