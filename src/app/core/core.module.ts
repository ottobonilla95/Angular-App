import { NgModule, SkipSelf, Optional } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./interceptors/Auth.interceptor";
import { StoreModule } from "@ngrx/store";
import * as reducers from "../store/app.reducer";

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(reducers.appReducer),
  ],
  exports: [SharedModule, HttpClientModule, StoreModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule has already been loaded. You should only import Core modules in the AppModule only."
      );
    }
  }
}
