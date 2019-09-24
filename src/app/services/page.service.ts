import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private pageTitle = new Subject<string>();

  constructor() { }

  public get getPageTitle(): Observable<string> {
    return this.pageTitle.asObservable();
  }

  public setPageTitle(value: string): void {
    this.pageTitle.next(value);
  }
}
