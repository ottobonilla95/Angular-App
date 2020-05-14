import { Component } from "@angular/core";
import { AlbumService } from "src/app/core/services/Album.service";
import { Album } from "src/app/shared/models/album.model";

import { Store } from "@ngrx/store";
import * as reducers from "../../../../store/app.reducer";
import * as albumActions from "../../store/album.actions";
import * as _ from "lodash";

@Component({
  selector: "app-album-home",
  templateUrl: "./album-home.component.html",
  styleUrls: ["./album-home.component.css"],
})
export class AlbumHomeComponent {
  constructor(
    private albumService: AlbumService,
    private store: Store<reducers.AppState>
  ) {}

  albums: Album[] = [];
  ownAlbums: Album[] = [];
  userId;

  ngOnInit(): void {
    this.store.select("profile").subscribe((profile) => {
      if (profile.userProfile) {
        this.userId = profile.userProfile.id;

        this.store.select("album").subscribe((album) => {
          this.albums = album.albums;

          console.log(this.albums);

          let u = this.userId;
          this.ownAlbums = _.filter(album.albums, function (album) {
            return album.userId == u;
          });
        });
      }
    });

    this.albumService.getAll().subscribe((albums) => {
      this.store.dispatch(new albumActions.LoadAlbums(albums));
    });
  }
}
