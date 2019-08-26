import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ListModelItem} from './models/listModel';

@Injectable({providedIn: 'root'})
export class SearchService {
  private viewSubject = new Subject<any>();

  public setSearchData(data: ListModelItem) {
    this.viewSubject.next(data);
  }

  public clearMessage(type?: string) {
    this.viewSubject.next();
  }

  public getSearchData(): Observable<any> {
    return this.viewSubject.asObservable();
  }
}

export class ViewSubject {
  public data: string;
}
