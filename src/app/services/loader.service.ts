import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  private loader = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  getLoader(): Observable<boolean> {
    return this.loader.asObservable();
  }

  show(): void {
    this.loader.next(true);
  }

  hide(): void {
    this.loader.next(false);
  }
}
