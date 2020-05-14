import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Song } from "src/app/shared/models/song.model";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { SongService } from "src/app/core/services/Song.service";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./song-modal.component.html",
  styleUrls: ["./song-modal.component.css"],
})
export class SongModalComponent {
  songForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private songService: SongService,
    public dialogRef: MatDialogRef<SongModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { song: Song; albumId: string }
  ) {}

  ngOnInit(): void {
    this.songForm = this.fb.group({
      url: new FormControl("", Validators.required),
    });

    if (this.data.song) {
      this.songForm.controls.url.setValue(this.data.song.url);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  saveSong() {
    let songToSave: Song = new Song();

    if (this.data.song) {
      songToSave.id = this.data.song.id;
    }

    songToSave.albumId = this.data.albumId;

    songToSave.url = this.songForm.get("url").value;
    this.dialogRef.close(songToSave);
  }
}
