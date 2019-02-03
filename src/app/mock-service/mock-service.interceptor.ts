import { Injectable, InjectionToken } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MockData } from './mock-data';
import { Transaction } from '../models/transaction';
import { Util } from '../util';
import { Category } from '../models/category';

@Injectable()
export class MockServiceInterceptor implements HttpInterceptor {

    transactions: Transaction[];
    categories: Category[];

    constructor() {
        console.warn(`!!! MOCK SERVICES ARE ENABLED !!! To disable comment out line in app.module.ts' 'providers' array`);
        this.transactions = MockData.transactions.map(item => new Transaction(item));
        this.categories = MockData.categories.map(item => new Category(item));
    }

    sleep(millisecs: number) {
        const initiation = new Date().getTime();
        while ((new Date().getTime() - initiation) < millisecs) { }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // example GET endpoint
            if (request.url.endsWith('/exampleEndpoint') && request.method === 'GET') {
                console.log(`>>>>>> MOCK <<<<<< ${request.url}`);
                this.sleep(500);
                const dataObj = [{ id: '1234', data: 'data goes here' }, { id: '5678', data: 'data goes here' }];
                if (dataObj) {
                    return of(new HttpResponse({ status: 200, body: dataObj }));
                } else {
                    return throwError({ error: { message: 'Error' } });
                }
            }

            // example GET endpoint with id
            if (request.url.match(/\/exampleEndpoint\/\d+$/) && request.method === 'GET') {
                console.log(`>>>>>> MOCK <<<<<< ${request.url}`);
                this.sleep(500);
                const urlParts = request.url.split('/');
                const id = parseInt(urlParts[urlParts.length - 1], 10);
                const dataObj = { id: id, data: 'data goes here' };
                if (dataObj) {
                    return of(new HttpResponse({ status: 200, body: dataObj }));
                } else {
                    return throwError({ error: { message: 'Error' } });
                }
            }

            // example POST endpoint
            if (request.url.endsWith('/exampleEndpoint') && request.method === 'POST') {
                const reqBody = request.body;
                console.log(`>>>>>> MOCK <<<<<< ${request.url}`, reqBody);
                this.sleep(500);
                if (reqBody) {
                    return of(new HttpResponse({ status: 200, body: reqBody }));
                } else {
                    return throwError({ error: { message: 'Error' } });
                }
            }


            // GET Transactions
            if (request.url.endsWith('/transactions') && request.method === 'GET') {
                console.log(`>>>>>> MOCK <<<<<< ${request.url}`);
                this.sleep(500);
                const dataObj = this.transactions;
                if (dataObj) {
                    return of(new HttpResponse({ status: 200, body: dataObj }));
                } else {
                    return throwError({ error: { message: 'Error' } });
                }
            }

            // POST Transaction
            if (request.url.endsWith('/transaction') && request.method === 'POST') {
                const reqBody = request.body;
                console.log(`>>>>>> MOCK <<<<<< ${request.url}`, reqBody);
                this.sleep(500);
                if (reqBody) {
                    reqBody.id = Util.newGuid();
                    this.transactions.push(reqBody);
                    return of(new HttpResponse({ status: 200, body: reqBody }));
                } else {
                    return throwError({ error: { message: 'Error' } });
                }
            }

            // GET Transactions
            if (request.url.endsWith('/categories') && request.method === 'GET') {
                console.log(`>>>>>> MOCK <<<<<< ${request.url}`);
                this.sleep(500);
                const dataObj = this.categories;
                if (dataObj) {
                    return of(new HttpResponse({ status: 200, body: dataObj }));
                } else {
                    return throwError({ error: { message: 'Error' } });
                }
            }

            // pass through any requests not handled above
            return next.handle(request);

        }));
    }
}

export let MockServiceProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: MockServiceInterceptor,
    multi: true
};
