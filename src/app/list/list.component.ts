import {Component, OnInit, ViewChild} from '@angular/core';
import {ListModelItem} from '../models/listModel';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {faSearch, faBars} from '@fortawesome/free-solid-svg-icons';
import {ResultService} from '../services/api/result.service';
import {PdfJsViewerComponent} from 'ng2-pdfjs-viewer';
import {mockPdf} from '../models/mockdata';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  bsModalRef: BsModalRef;


  faBars = faBars;
  faSearch = faSearch;
  public items: ListModelItem[];
  public filteredItems: ListModelItem[] = [];
  public isMobile: string = 'mobile';
  public searchEditModal = false;
  public pdfModal = false;
  public pdfModalData = ListModelItem;
  @ViewChild(PdfJsViewerComponent, {static: true}) public pdfViewer: PdfJsViewerComponent;
  title: string;
  base64 = mockPdf;

  constructor(private modalService: BsModalService, private resultService: ResultService) {
  }

  ngOnInit() {
    // this.filteredItems = this.items.slice(0, 20);
    this.getAll();
  }

  pageChanged(event: PageChangedEvent) {
    const startIndex = (event.page - 1) * 20;
    const endIndex = Math.min(startIndex + 20 - 1, this.items.length - 1);
    this.filteredItems = this.items.slice(startIndex, endIndex + 1);
  }

  openModal(item: ListModelItem) {
    this.pdfModal = true;
    // @ts-ignore
    this.pdfModalData = item;
    // this.bsModalRef = this.modalService.show(ItemDetailsComponent, {class: 'modal-lg'});
    // this.bsModalRef.content.title = item.productName;
    this.viewPDF();
  }

  viewPDF(): void {
    const blob: Blob = this.base64ToBlob(this.base64, 'application/pdf', 512);
    this.pdfViewer.pdfSrc = blob;
    this.pdfViewer.showSpinner = true;
    this.pdfViewer.refresh();
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


  editSearch(item: ListModelItem) {
    this.searchEditModal = true;
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

  public _toggleOpened(): void {
    this._opened = !this._opened;
  }

  public _toggleMode(): void {
    this._modeNum++;

    if (this._modeNum === this._MODES.length) {
      this._modeNum = 0;
    }
  }

  public _toggleAutoCollapseHeight(): void {
    this._autoCollapseHeight = this._autoCollapseHeight ? null : 500;
  }

  public _toggleAutoCollapseWidth(): void {
    this._autoCollapseWidth = this._autoCollapseWidth ? null : 800;
  }

  public _togglePosition(): void {
    this._positionNum++;

    if (this._positionNum === this._POSITIONS.length) {
      this._positionNum = 0;
    }
  }

  public _toggleDock(): void {
    this._dock = !this._dock;
  }

  public _toggleCloseOnClickOutside(): void {
    this._closeOnClickOutside = !this._closeOnClickOutside;
  }

  public _toggleCloseOnClickBackdrop(): void {
    this._closeOnClickBackdrop = !this._closeOnClickBackdrop;
  }

  public _toggleShowBackdrop(): void {
    this._showBackdrop = !this._showBackdrop;
  }

  public _toggleAnimate(): void {
    this._animate = !this._animate;
  }

  public _toggleTrapFocus(): void {
    this._trapFocus = !this._trapFocus;
  }

  public _toggleAutoFocus(): void {
    this._autoFocus = !this._autoFocus;
  }

  public _toggleKeyClose(): void {
    this._keyClose = !this._keyClose;
  }

  public _onOpenStart(): void {
    console.info('Sidebar opening');
  }

  public _onOpened(): void {
    console.info('Sidebar opened');
  }

  public _onCloseStart(): void {
    console.info('Sidebar closing');
  }

  public _onClosed(): void {
    console.info('Sidebar closed');
  }

  public _onTransitionEnd(): void {
    console.info('Transition ended');
  }

  public _onBackdropClicked(): void {
    console.info('Backdrop clicked');
  }

  public getAll() {
    this.resultService.getAll().subscribe(res => {
      this.items = res;
      this.filteredItems = this.items.slice(0, 20);
    });
  }


}
