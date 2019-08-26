import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {ListModelItem} from "../models/listModel";
import {SearchService} from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() isMobile: string;
  public daterange: any = {};
  public searchData: ListModelItem;
  public options: any = {
    locale: {format: 'MM-DD-YYYY'},
    alwaysShowCalendars: false,
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
  };

  constructor(private router: Router, private  searchService: SearchService) {
    // @ts-ignore
    this.searchData = {
      fmcBusiness: 'All',
      language: 'All',
      format: 'All',
      wercsSubFormat: 'All'
    };
  }

  ngOnInit() {

  }

  goToList() {
    this.searchService.setSearchData(this.searchData);
    this.router.navigate(['list']);
  }

  resetFilter() {
    // @ts-ignore
    this.searchData = {
      fmcBusiness: 'All',
      language: 'All',
      format: 'All',
      wercsSubFormat: 'All'
    };
  }

  public selectedDate(value: any, datepicker?: any, publishedDate?: string) {
    // this is the date the iser selected
    console.log(value);

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }


}
