import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ListModelItem} from './models/listModel';

@Injectable({providedIn: 'root'})
export class SearchService {
  private viewSubject = new BehaviorSubject<ListModelItem>(new ListModelItem());

  public setSearchData(data: ListModelItem) {
    this.viewSubject.next(data);
  }

  public clearMessage(type?: string) {
    // this.viewSubject.next();
  }

  public getSearchData(): Observable<ListModelItem> {
    return this.viewSubject.asObservable();
  }
}

export class ViewSubject {
  public data: string;
}
