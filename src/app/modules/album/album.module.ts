import { NgModule } from "@angular/core";
import {AlbumHomeComponent} from './pages/home/album-home.component';
import {AlbumRoutingModule} from './album.routes';
import {SharedModule} from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[AlbumHomeComponent],
    imports:[CommonModule, AlbumRoutingModule, SharedModule],
})

export class AlbumModule{ }