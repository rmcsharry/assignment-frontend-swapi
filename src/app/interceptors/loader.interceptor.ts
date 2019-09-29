import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, delay } from "rxjs/operators";
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/reducers'
import * as Loader from '../store/actions/loader.actions';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<{ app: fromRoot.State }>,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('people/?page')) {
      this.store.dispatch(new Loader.StartLoader())
    };

    // deliberate delay to ensure loading animation is seen at least once! Got to flaunt that Star Wars humour ;)
    return next.handle(request).pipe(
      delay(0),
      finalize(() => {
        if (!request.url.includes('people/?page')) this.store.dispatch(new Loader.StopLoader())
      })
    );
  }
}
