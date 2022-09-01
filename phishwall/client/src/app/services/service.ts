import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { getUrlScheme } from '@angular/compiler';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class Service {
    private httpOptions: any;

    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }
    private handleError(error: HttpErrorResponse): any {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    postUrl(url: any): Observable<any> {
        return this.http.post('http://localhost:3000/posturl', url, this.httpOptions).pipe(
            catchError(this.handleError(url))
        );
    }

    postFeatures(features: any): Observable<any> {
        return this.http.post('http://localhost:5000/features', features, this.httpOptions).pipe(
            catchError(this.handleError(features))
        );
    }

    getFeatures(): Observable<any> {
        return this.http.get('http://localhost:5000/get_features', this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    get_nb_external_redirection(): Observable<any> {
        return this.http.get('http://localhost:3000/nb_external_redirection', this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    tld_in_subdomain(): Observable<any> {
        return this.http.get('http://localhost:3000/tld_in_subdomain', this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    phish_hints(): Observable<any> {
        return this.http.get('https://www.spam-words.com/api/words/en', this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    get_page_content(): Observable<any> {
        return this.http.get('http://localhost:3000/html_content', this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    get_r_result(): Observable<any> {
        return this.http.get('http://localhost:3000/r_result', this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

}
