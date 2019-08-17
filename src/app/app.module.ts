import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SearchComponent} from './search/search.component';
import {ListComponent} from './list/list.component';
import {HeaderComponent} from './header/header.component';
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {SidebarModule} from 'ng-sidebar';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent,
    HeaderComponent,
    ItemDetailsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PaginationModule.forRoot(),
    SidebarModule.forRoot(),
    ModalModule.forRoot(),
    PdfJsViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ItemDetailsComponent]
})
export class AppModule {
}
