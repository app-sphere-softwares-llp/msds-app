import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() isMobile: string;
  public daterange: any = {};
  public options: any = {
    locale: { format: 'MM-DD-YYYY' },
    alwaysShowCalendars: false,
  };
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goToList() {
    this.router.navigate(['list']);
  }

  public selectedDate(value: any, datepicker?: any) {
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
