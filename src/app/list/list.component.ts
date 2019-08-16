import {Component, OnInit} from '@angular/core';
import {ListModelItem} from '../models/listModel';
import {mockData} from '../models/mockdata';
import {PageChangedEvent} from 'ngx-bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public items: ListModelItem[] = mockData;
  public filteredItems: ListModelItem[] = [];

  constructor() {
  }

  ngOnInit() {
    this.filteredItems = this.items.slice(0, 10);
  }

  pageChanged(event: PageChangedEvent) {
    const startIndex = (event.page - 1) * 10;
    const endIndex = Math.min(startIndex + 10 - 1, this.items.length - 1);
    this.filteredItems = this.items.slice(startIndex, endIndex + 1);
  }

}
