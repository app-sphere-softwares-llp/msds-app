import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ListModelItem} from '../models/listModel';
import {SearchService} from '../search.service';
import {DaterangePickerComponent} from 'ng2-daterangepicker';

const MSDP_DATE_FORMAT = 'MM-DD-YYYY';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() isMobile: string;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  // @ts-ignore
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  // @ts-ignore
  @ViewChild('RevisionDaterangeInput') RevisionDaterangeInput: ElementRef;


  public searchData: ListModelItem;

  public optionsRevision: any = {
    locale: {format: MSDP_DATE_FORMAT},
    alwaysShowCalendars: false,
    singleDatePicker: false,
    selector: 'rev',
    showDropdowns: true,
  };
  public optionsPublish: any = {
    locale: {format: MSDP_DATE_FORMAT},
    alwaysShowCalendars: false,
    singleDatePicker: false,
    showDropdowns: true,
  };
  public pickerIndex: number = null;

  constructor(private router: Router, private  searchService: SearchService) {

  }

  initObject() {
    // @ts-ignore
    this.searchData = {
      fmcBusiness: 'All',
      language: 'All',
      format: 'All',
      wercsSubFormat: 'All',
      revisionDateFilterType: 'eq',
      publishDateFilterType: 'eq',
      productNameCondition: 'value~',
      revisionDate: '',
      publishDate: '',
      revisionDays: 15,
      publishDays: 15


    };
    this.optionsRevision.singleDatePicker = true;
    this.optionsPublish.singleDatePicker = true;
    this.picker.render();
  }

  ngOnInit() {
    this.initObject();
  }

  changeCss(type: string) {
    const cls = document.querySelectorAll('.dropdown-menu');
    if (this.pickerIndex !== 1) {
      if (type === 'rev') {
        cls[0].classList.add('show-visibility');
      } else {
        cls[1].classList.add('show-visibility');
      }
    } else {
      cls[this.pickerIndex].classList.add('show-visibility');
    }
  }

  selectDateCondition(type?: string, event?: any) {
    if (type === 'rev') {
      this.pickerIndex = 1;
      if (event.target.value === 'range') {
        this.optionsRevision.singleDatePicker = false;
      } else {
        this.optionsRevision.singleDatePicker = true;
      }
    } else {
      this.pickerIndex = 0;
      if (event.target.value === 'range') {
        this.optionsPublish.singleDatePicker = false;
      } else {
        this.optionsPublish.singleDatePicker = true;
      }
    }

    this.picker.render();
  }

  goToList() {
    console.log(this.searchData);
    this.searchService.setSearchData(this.searchData);
    this.closeModal.emit(true);
    this.router.navigate(['list']);
  }

  resetFilter() {
    this.initObject();
  }

  public selectedDate(value: any, type?: any) {
    if (type === 'pub' && this.searchData.publishDateFilterType === 'range') {
      this.searchData.publishDate = value.picker.startDate.format(MSDP_DATE_FORMAT) + ' - ' + value.picker.endDate.format(MSDP_DATE_FORMAT);
    }
    if (type === 'pub' && this.searchData.publishDateFilterType !== 'range') {
      this.searchData.publishDate = value.picker.startDate.format(MSDP_DATE_FORMAT);
    }
    if (type === 'rev' && this.searchData.revisionDateFilterType === 'range') {
      this.searchData.revisionDate = value.picker.startDate.format(MSDP_DATE_FORMAT) + ' - ' + value.picker.endDate.format(MSDP_DATE_FORMAT);
    }
    if (type === 'rev' && this.searchData.revisionDateFilterType !== 'range') {
      this.searchData.revisionDate = value.picker.startDate.format(MSDP_DATE_FORMAT);
    }
  }
}

