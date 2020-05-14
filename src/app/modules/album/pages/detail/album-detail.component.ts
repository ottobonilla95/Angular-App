import { Component } from "@angular/core";

import { Store } from "@ngrx/store";
import * as albumActions from "../../store/album.actions";
import * as reducers from "../../../../store/app.reducer";

import * as _ from "lodash";

import { ActivatedRoute, Router } from "@angular/router";
import { AlbumService } from "src/app/core/services/Album.service";
import { Album } from "src/app/shared/models/album.model";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-album-edit",
  templateUrl: "./album-detail.component.html",
  styleUrls: ["./album-detail.component.css"],
})
export class AlbumDetailComponent {
  album: Album;
  loading: Boolean = false;
  mine: Boolean;
  userId;

  constructor(
    private albumService: AlbumService,
    private store: Store<reducers.AppState>,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;

    this.store.select("profile").subscribe((profile) => {
      if (profile.userProfile) {
        this.userId = profile.userProfile.id;
      }
    });

    this.store.select("album").subscribe((album) => {
      this.album = _.find(album.albums, function (album) {
        return album.id == id;
      });
      this.loading = album.loading;
      if (this.album) {
        this.mine = this.userId == this.album.userId;
      }
    });

    this.albumService.get(id).subscribe((album) => {
      this.store.dispatch(new albumActions.LoadAlbum(album));
    });
  }
  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "450px",
      data: {
        message: `Are you sure you want to delete Album ${this.album.name} ? `,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.albumService.delete(this.album.id).subscribe(() => {
          this.store.dispatch(new albumActions.DeleteAlbum(this.album.id));
          this.router.navigate(["/album"]);
        });
      }
    });
  }
}
