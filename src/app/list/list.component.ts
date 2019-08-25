import {Component, OnInit} from '@angular/core';
import {ListModelItem} from '../models/listModel';
import {mockData} from '../models/mockdata';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {faBars, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {ItemDetailsComponent} from '../item-details/item-details.component';
import {ResultService} from '../services/api/result.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  bsModalRef: BsModalRef;
  faBars = faBars;
  faArrowLeft = faArrowLeft;
  public items: ListModelItem[];
  public filteredItems: ListModelItem[] = [];
  public isMobile: string = 'mobile';

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
    this.bsModalRef = this.modalService.show(ItemDetailsComponent, {class: 'modal-lg'});
    this.bsModalRef.content.title = item.productName;
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
    this._autoCollapseWidth = this._autoCollapseWidth ? null : 500;
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
      this.items = res.response;
      this.filteredItems = this.items.slice(0, 20);
    });
  }

}
