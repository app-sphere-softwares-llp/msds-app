import {Component, OnInit, ViewChild} from '@angular/core';
import {ListModelItem} from '../models/listModel';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {faBars, faSearch} from '@fortawesome/free-solid-svg-icons';
import {ResultService} from '../services/api/result.service';
import {PdfJsViewerComponent} from 'ng2-pdfjs-viewer';
import {mockPdf} from '../models/mockdata';
import {SearchService} from '../search.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {takeUntil} from 'rxjs/operators';
import {combineLatest, ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  bsModalRef: BsModalRef;
  showSpinner: boolean = false;

  faBars = faBars;
  faSearch = faSearch;
  public items: ListModelItem[] = [];
  public filteredItems: ListModelItem[] = [];
  public isMobile: string = 'mobile';
  public searchEditModal = false;
  public pdfModal = false;
  public pdfModalData: ListModelItem;
  public searchData: ListModelItem;

  public isFilterSearchApplied = false;
  @ViewChild(PdfJsViewerComponent, {static: true}) public pdfViewer: PdfJsViewerComponent;
  title: string;
  base64 = mockPdf;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private router: Router, private modalService: BsModalService, private resultService: ResultService, private  searchService: SearchService) {
  }

  applyFilter() {
    // tslint:disable-next-line:max-line-length
    const allowedFilterCols = ['productName', 'commonName', 'tradeName', 'wercsSubFormat', 'language', 'publishDate', 'revisionDate', 'specificationID'];
    this.items = this.items.filter((item) => {
      const resArr = [];
      Object.keys(this.searchData).filter(f => allowedFilterCols.includes(f)).forEach(key => {
        // for date related things
        if ((key === 'publishDate' && this.searchData.publishDate) || (key === 'revisionDate' && this.searchData.revisionDate)) {
          const filterType = this.searchData[`${key}FilterType`];
          switch (filterType) {
            case 'eq':
              resArr.push(moment(item[key], 'YYYY-MM-DD').isSame(moment([key], 'MM-DD-YYYY')));
              break;
            case 'gteq':
              resArr.push(moment(item[key], 'YYYY-MM-DD').isSameOrAfter(moment(this.searchData[key], 'MM-DD-YYYY')));
              break;
            case 'lt':
              resArr.push(moment(item[key], 'YYYY-MM-DD').isSameOrBefore(moment(this.searchData[key], 'MM-DD-YYYY')));
              break;
            case 'range':
              const strArray = this.searchData.revisionDate.toString().split('-');
              // tslint:disable-next-line:max-line-length
              resArr.push(moment(item[key], 'YYYY-MM-DD').isBetween(moment(strArray[0].trim(), 'MM-DD-YYYY'), moment(strArray[1].trim(), 'MM-DD-YYYY')));
              break;
            default:
              resArr.push(false);
          }
        } else {
          if (this.searchData[key] === 'All') {
            resArr.push(true);
          } else {
            resArr.push((item[key] || '').toLowerCase().indexOf((this.searchData[key] || '').toLowerCase()) > -1);
          }
        }
      });
      return resArr.every(s => s);
    });
    this.filteredItems = this.items.slice(0, 25);
  }


  ngOnInit() {
    this.showSpinner = true;
    combineLatest([ this.resultService.getAll(),this.searchService.getSearchData()])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(results => {
        this.items = results[0];
        this.searchData = results[1];
        this.applyFilter();
        this.showSpinner = false;
      });
  }

  pageChanged(event: PageChangedEvent) {
    const startIndex = (event.page - 1) * 25;
    const endIndex = Math.min(startIndex + 25 - 1, this.items.length - 1);
    this.filteredItems = this.items.slice(startIndex, endIndex + 1);
  }

  openModal(item: ListModelItem, showInNewTab: boolean = false) {
    this.pdfModal = !showInNewTab;
    // @ts-ignore
    this.pdfModalData = item;
    // this.bsModalRef = this.modalService.show(ItemDetailsComponent, {class: 'modal-lg'});
    // this.bsModalRef.content.title = item.productName;
    this.viewPDF(showInNewTab, item);
  }

  viewPDF(isNewTab: boolean, item: ListModelItem): void {

    const blob: Blob = this.base64ToBlob(this.base64, 'application/pdf', 512);
    this.pdfViewer.pdfSrc = '/assets/' + item.pdfName;
    this.pdfViewer.showSpinner = true;
    this.pdfViewer.externalWindow = isNewTab;
    this.pdfViewer.refresh();
  }

  openPDF(isNewTab: boolean, item: ListModelItem): void {

    window.open('../../assets/' + item.pdfName, '_blank');

  }

  base64ToBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    let offset = 0;
    while (offset < byteCharacters.length) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      let i = 0;
      while (i < slice.length) {
        byteNumbers[i] = slice.charCodeAt(i);
        i++;
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
      offset += sliceSize;
    }
    return new Blob(byteArrays, {type: contentType});
  }


  editSearch() {
    this.searchEditModal = true;
  }

  goToHome() {
    this.router.navigate(['search']);
  }

  /**
   * Close the modal and reset error states
   */
  public cancel(): void {
    this.searchEditModal = false;
    this.pdfModal = false;
  }

  public _opened: boolean = false;
  public _modeNum: number = 0;
  public _positionNum: number = 0;
  public _dock: boolean = false;
  public _closeOnClickOutside: boolean = false;
  public _closeOnClickBackdrop: boolean = false;
  public _showBackdrop: boolean = false;
  public _animate: boolean = true;
  public _trapFocus: boolean = true;
  public _autoFocus: boolean = true;
  public _keyClose: boolean = false;
  public _autoCollapseHeight: number = null;
  public _autoCollapseWidth: number = null;

  public _MODES: Array<string> = ['push'];
  public _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];
  public self = [{field: 'name', title: 'Name', show: true},
    {field: 'age', title: 'Age', show: true},
    {field: 'money', title: 'Money', show: true}];


  public getAll() {
    this.showSpinner = true;
    this.resultService.getAll().subscribe(res => {
      this.items = res;
      this.filteredItems = this.items.slice(0, 25);
      this.showSpinner = false;
    });
  }

  // public _toggleOpened(): void {
  //   this._opened = !this._opened;
  // }
  //
  // public _toggleMode(): void {
  //   this._modeNum++;
  //
  //   if (this._modeNum === this._MODES.length) {
  //     this._modeNum = 0;
  //   }
  // }
  //
  // public _toggleAutoCollapseHeight(): void {
  //   this._autoCollapseHeight = this._autoCollapseHeight ? null : 500;
  // }
  //
  // public _toggleAutoCollapseWidth(): void {
  //   this._autoCollapseWidth = this._autoCollapseWidth ? null : 800;
  // }
  //
  // public _togglePosition(): void {
  //   this._positionNum++;
  //
  //   if (this._positionNum === this._POSITIONS.length) {
  //     this._positionNum = 0;
  //   }
  // }
  //
  // public _toggleDock(): void {
  //   this._dock = !this._dock;
  // }
  //
  // public _toggleCloseOnClickOutside(): void {
  //   this._closeOnClickOutside = !this._closeOnClickOutside;
  // }
  //
  // public _toggleCloseOnClickBackdrop(): void {
  //   this._closeOnClickBackdrop = !this._closeOnClickBackdrop;
  // }
  //
  // public _toggleShowBackdrop(): void {
  //   this._showBackdrop = !this._showBackdrop;
  // }
  //
  // public _toggleAnimate(): void {
  //   this._animate = !this._animate;
  // }
  //
  // public _toggleTrapFocus(): void {
  //   this._trapFocus = !this._trapFocus;
  // }
  //
  // public _toggleAutoFocus(): void {
  //   this._autoFocus = !this._autoFocus;
  // }
  //
  // public _toggleKeyClose(): void {
  //   this._keyClose = !this._keyClose;
  // }
  //
  // public _onOpenStart(): void {
  //   console.info('Sidebar opening');
  // }
  //
  // public _onOpened(): void {
  //   console.info('Sidebar opened');
  // }
  //
  // public _onCloseStart(): void {
  //   console.info('Sidebar closing');
  // }
  //
  // public _onClosed(): void {
  //   console.info('Sidebar closed');
  // }
  //
  // public _onTransitionEnd(): void {
  //   console.info('Transition ended');
  // }
  //
  // public _onBackdropClicked(): void {
  //   console.info('Backdrop clicked');
  // }


}
