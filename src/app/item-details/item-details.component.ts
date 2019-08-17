import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {PdfJsViewerComponent} from 'ng2-pdfjs-viewer';
import {mockPdf} from '../models/mockdata';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html'
})

export class ItemDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild(PdfJsViewerComponent, {static: true}) public pdfViewer: PdfJsViewerComponent;
  title: string;
  base64 = mockPdf;

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
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
}
