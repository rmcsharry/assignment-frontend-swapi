// import { Injectable, Injector } from "@angular/core";
// import {
//   HttpEvent,
//   HttpRequest,
//   HttpHandler,
//   HttpInterceptor,
//   HttpResponse
// } from "@angular/common/http";
// import { Observable } from "rxjs";
// import { finalize, delay, map } from "rxjs/operators";
// import { Store } from '@ngrx/store';
// import * as fromRoot from '../store/reducers'
// import * as Loader from '../store/actions/loader.actions';

// @Injectable()
// export class LoaderInterceptor implements HttpInterceptor {
//   constructor(
//     private store: Store<{ app: fromRoot.State }>,
//   ) { }
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (request.method !== "GET") {
//       return next.handle(request);
//     };

//     if (request.url.includes('people/?page')) {

//     return next.handle(request).pipe(
//       map((event: HttpEvent<any>) => {
//         if (event instanceof HttpResponse) {
//           let modEvent =  event.clone({
//             body: request.body.append('id', getIdFromUrl('body.'))
//           })

//           return modEvent;
//         }
//       })
//     );
//   }
// }

