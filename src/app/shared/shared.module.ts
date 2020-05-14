import { NgModule } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDialogModule } from "@angular/material/dialog";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";

import { ImageCropperModule } from "ngx-image-cropper";
import { ReactiveFormsModule } from "@angular/forms";
import { ImageUploadComponent } from "./components/image-upload/image-upload.component";
import { CommonModule } from "@angular/common";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { ImageUploadModalComponent } from "./components/image-upload/image-upload-modal/image-upload-modal.component";
import { SafePipe } from "./pipes/safe.pipe";

@NgModule({
  declarations: [
    ImageUploadComponent,
    ConfirmDialogComponent,
    ImageUploadModalComponent,
    SafePipe,
  ],
  entryComponents: [ConfirmDialogComponent, ImageUploadModalComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatListModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    MatCardModule,
    MatGridListModule,
    ImageCropperModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
  ],

  exports: [
    CommonModule,
    MatDividerModule,
    MatListModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    MatCardModule,
    MatGridListModule,
    ImageCropperModule,
    ReactiveFormsModule,
    ImageUploadComponent,
    MatDialogModule,
    ConfirmDialogComponent,
    ImageUploadModalComponent,
    SafePipe,
    MatSnackBarModule,
    MatTabsModule,
  ],
})
export class SharedModule {}
