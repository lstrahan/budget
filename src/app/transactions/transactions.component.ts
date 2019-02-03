import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { Transaction } from '../models/transaction';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, AfterViewInit {

  private gridApi;

  columnDefs = [
    { headerName: 'Title', field: 'title' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Category', field: 'category' },
    { headerName: 'Amount', field: 'amount' }
  ];

  defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    resizable: true
  };

  constructor(private appService: AppService) { }

  ngOnInit() { }

  ngAfterViewInit() { }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.setColumnDefs(this.columnDefs);
    this.gridApi.sizeColumnsToFit();
    this.appService.getTransactions().subscribe(res => {
      this.gridApi.setRowData(res);
    });
  }

  onBtnAddTransaction() {
    const newTrans = new Transaction();
    newTrans.title = 'new transaction';
    newTrans.category = 'b';
    newTrans.amount = 37.90;
    this.appService.createTransaction(newTrans).subscribe(res => {
      this.gridApi.updateRowData({ add: [res] });
    });
  }

}
