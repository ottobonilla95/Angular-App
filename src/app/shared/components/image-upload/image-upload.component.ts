import { Component, Output, EventEmitter, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ImageUploadModalComponent } from "./image-upload-modal/image-upload-modal.component";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.css"],
})
export class ImageUploadComponent {
  @Input("previewImage") previewImage;
  @Input("buttonText") buttonText;
  @Input("loading") loading;

  
  @Output()
  onCrop = new EventEmitter<string>();

  imageChangedEvent: any;
  croppedImage: any;
  savedImage: Boolean;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openModal() {
    const dialogRef = this.dialog.open(ImageUploadModalComponent, {
      width: "450px",
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.croppedImage = result;
        this.onCrop.emit(result);
        this.savedImage = true;
      }
    });
  }
}
