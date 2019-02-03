import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { Transaction } from './models/transaction';
import { Util } from './util';
import { Category } from './models/category';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const rootUrl = 'http://localhost';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  /**************************************************************************
   * GET /transactions
   * get all transactions
   **************************************************************************/
  getTransactions(): Observable<Transaction[]> {
    console.log('AppService.getTransactions');
    const url = Util.urlJoin(rootUrl, '/transactions');

    return this.http.get<Transaction[]>(url, httpOptions).pipe(
      tap(res => console.log('    got transactions', res)),
      map(res => res.map(item => new Transaction(item)))
    );
  }

  /**************************************************************************
   * POST /transaction
   * create new transaction
   **************************************************************************/
  createTransaction(trans: Transaction): Observable<Transaction> {
    console.log('AppService.createTransaction');
    const url = Util.urlJoin(rootUrl, '/transaction');

    return this.http.post<Transaction>(url, trans.serialize(), httpOptions).pipe(
      tap(res => console.log('    created transaction', res)),
      map(res => new Transaction(res))
    );
  }

  /**************************************************************************
   * PUT /transaction
   * update transaction
   **************************************************************************/
  updateTransaction(trans: Transaction): Observable<Transaction> {
    console.log('AppService.updateTransaction');
    const url = Util.urlJoin(rootUrl, '/transaction');

    return this.http.put<Transaction>(url, trans.serialize(), httpOptions).pipe(
      tap(res => console.log('    updated transaction', res)),
      map(res => new Transaction(res))
    );
  }

  /**************************************************************************
   * GET /categories
   * get all categories
   **************************************************************************/
  getCategories(): Observable<Category[]> {
    console.log('AppService.getCategories');
    const url = Util.urlJoin(rootUrl, '/categories');

    return this.http.get<Category[]>(url, httpOptions).pipe(
      tap(res => console.log('    got categories', res)),
      map(res => res.map(item => new Category(item)))
    );
  }

}
