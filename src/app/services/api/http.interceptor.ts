import { empty as observableEmpty, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class MSDSHttpInterceptor implements HttpInterceptor {

    private isOnline: boolean = navigator.onLine;

    constructor() {
        window.addEventListener('online', () => {
            this.isOnline = true;
        });
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    // public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     if (this.isOnline) {
    //         return next.handle(request);
    //     } else {
    //         setTimeout(() => {
    //             alert('Please check your internet connection.');
    //         }, 100);
    //         return observableEmpty();
    //     }
    // }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.isOnline) {
            return next.handle(request)
                .pipe(
                    retry(1),
                    catchError((error: HttpErrorResponse) => {
                        let errorMessage = '';
                        if (error.error instanceof ErrorEvent) {
                            // client-side error
                            errorMessage = `Error: ${error.error.message}`;
                        } else {
                            // server-side error
                            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        }
                        window.alert(errorMessage);
                        return throwError(errorMessage);
                    })
                );
        } else {
            setTimeout(() => {
                alert('Please check your internet connection.');
            }, 100);
            return observableEmpty();
        }
    }
}
