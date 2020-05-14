import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({
  selector: "app-image-upload-modal",
  templateUrl: "./image-upload-modal.component.html",
  styleUrls: ["./image-upload-modal.component.css"],
})
export class ImageUploadModalComponent {
  @Output()
  onCrop = new EventEmitter<string>();

  imageChangedEvent: any;
  croppedImage: any;
  savedImage: Boolean;

  constructor(
    public dialogRef: MatDialogRef<ImageUploadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.savedImage = false;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  saveImage() {
    this.dialogRef.close(this.croppedImage);
  }
}
