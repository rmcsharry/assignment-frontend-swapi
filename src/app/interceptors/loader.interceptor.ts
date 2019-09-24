import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, delay } from "rxjs/operators";
import { LoaderService } from "../services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loaderService = this.injector.get(LoaderService);
    loaderService.show();

    // deliberate delay to ensure loading animation is seen at least once! Got to flaunt that Star Wars humour ;)
    return next.handle(request).pipe(
      delay(2500),
      finalize(() => loaderService.hide())
    );
  }
}
