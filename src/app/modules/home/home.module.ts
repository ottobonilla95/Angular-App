import { NgModule } from "@angular/core";
import {HomeComponent} from './pages/home/home.component';
import {HomeRoutingModule} from './home.routes';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    declarations:[HomeComponent],
    imports:[HomeRoutingModule, SharedModule],
})

export class HomeModule{ }