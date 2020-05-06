import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthInterceptorService } from './interceptors/Auth.interceptor';

@NgModule({
  imports: [SharedModule, HttpClientModule, ReactiveFormsModule],
  exports: [SharedModule, HttpClientModule, ReactiveFormsModule],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
