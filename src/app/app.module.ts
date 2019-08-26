import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SearchComponent} from './search/search.component';
import {ListComponent} from './list/list.component';
import {LoaderComponent} from './loader/loader.component'
import {HeaderComponent} from './header/header.component';
import {BsDatepickerModule, ModalModule, PaginationModule} from 'ngx-bootstrap';
import {SidebarModule} from 'ng-sidebar';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';
import {FilterComponent} from './filter/filter.component';
import {Daterangepicker} from 'ng2-daterangepicker';
import {LoaderService} from './loader/loader.service';
import {ResultService} from './services/api/result.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MSDSHttpInterceptor} from './services/api/http.interceptor';
import {HttpWrapperService} from './services/api/http-wrapper.service';
import {ConstantService} from './services/constant.service';
import {ClarityModule} from '@clr/angular';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent,
    HeaderComponent,
    ItemDetailsComponent,
    FilterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PaginationModule.forRoot(),
    SidebarModule.forRoot(),
    ModalModule.forRoot(),
    PdfJsViewerModule,
    Daterangepicker,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    ClarityModule
  ],
  providers: [
    HttpWrapperService,
    LoaderService,
    ResultService,
    ConstantService
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: MSDSHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [ItemDetailsComponent]
})
export class AppModule {
}
