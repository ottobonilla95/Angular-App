import { NgModule } from "@angular/core";
import {AlbumHomeComponent} from './pages/home/album-home.component';
import {AlbumRoutingModule} from './album.routes';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    declarations:[AlbumHomeComponent],
    imports:[AlbumRoutingModule, SharedModule],
})

export class AlbumModule{ }