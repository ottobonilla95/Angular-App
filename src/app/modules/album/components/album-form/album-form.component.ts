import { Component, EventEmitter, Output, Input } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Album } from "src/app/shared/models/album.model";
import { MatDialog } from "@angular/material/dialog";
import { SongModalComponent } from "../song-modal/song-modal.component";
import { Song } from "src/app/shared/models/song.model";
import { SongService } from "src/app/core/services/Song.service";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";

import { Store } from "@ngrx/store";
import * as albumActions from "../../store/album.actions";
import * as reducers from "../../../../store/app.reducer";
import { Router } from "@angular/router";
@Component({
  selector: "app-album-form",
  templateUrl: "./album-form.component.html",
  styleUrls: ["./album-form.component.css"],
})
export class AlbumFormComponent {
  @Input("loading") loading: Boolean;

  @Output()
  onSubmit = new EventEmitter<Album>();

  @Input("albumData") albumData: Album;

  albumForm: FormGroup;
  image: string;
  savedImage: Boolean;

  album: Album;
  userId;

  constructor(
    private fb: FormBuilder,
    private songService: SongService,
    public dialog: MatDialog,
    private store: Store<reducers.AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select("profile").subscribe((profile) => {
      if (profile.userProfile) {
        if (this.albumData.userId != profile.userProfile.id) {
          this.router.navigate(["/album"]);
        }
      }
    });

    this.albumForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    });

    if (this.albumData) {
      this.albumForm.controls.name.setValue(this.albumData.name);
      this.albumForm.controls.description.setValue(this.albumData.description);
    }
  }

  saveImage(croppedImage) {
    this.image = croppedImage;
  }

  openSongModal(song: Song) {
    const dialogRef = this.dialog.open(SongModalComponent, {
      width: "450px",
      data: { song: song, albumId: this.albumData.id },
    });

    dialogRef.afterClosed().subscribe((song: Song) => {
      if (song) {
        let url =
          "https://w.soundcloud.com/player/?url=" +
          song.url.replace(":", "%3A") +
          "&amp;?sharing=false&download=false&color=ff4080&show_user=false&show_playcount=false&show_artwork=false";

        song.url = url;
        if (song.id) {
          this.songService.updateSong(song).subscribe((response) => {
            this.store.dispatch(new albumActions.LoadSong(response.data));
          });
        } else {
          this.songService.saveSong(song).subscribe((response) => {
            this.store.dispatch(new albumActions.LoadSong(response.data));
          });
        }
      }
    });
  }

  deleteSong(song: Song) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "450px",
      data: {
        message: `Are you sure you want to delete this Song? `,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.songService.delete(song.id).subscribe((result) => {
          this.store.dispatch(new albumActions.DeleteSong(song));
        });
      }
    });
  }

  saveAlbum() {
    console.log("sdwsd");
    if (this.albumForm.valid) {
      this.album = new Album();
      this.album.name = this.albumForm.get("name").value;
      this.album.description = this.albumForm.get("description").value;
      this.album.image = this.image;

      if (this.albumData) {
        this.album.id = this.albumData.id;
      }

      this.onSubmit.emit(this.album);
    }
  }
}
