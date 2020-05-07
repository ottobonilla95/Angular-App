import { NgModule } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';

import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  imports: [
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
    MatCardModule
  ],

  exports: [
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
    MatCardModule
  ],
})
export class SharedModule {}
