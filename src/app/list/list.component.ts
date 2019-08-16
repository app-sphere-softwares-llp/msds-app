import {Component, OnInit} from '@angular/core';
import {ListModelItem} from '../models/listModel';
import {mockData} from '../models/mockdata';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public items: ListModelItem[] = mockData;

  constructor() {
  }

  ngOnInit() {
  }

}
