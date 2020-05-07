import { NgModule, SkipSelf, Optional } from "@angular/core";
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
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
