import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { Transaction } from '../models/transaction';
import { RowEvent, AgGridEvent, ColDef, GridApi } from 'ag-grid-community';
import { Category } from '../models/category';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, AfterViewInit {

  private gridApi: GridApi;
  private categories: Category[];

  columnDefs: ColDef[] = [
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

  onGridReady(params: AgGridEvent) {
    this.gridApi = params.api;
    this.gridApi.setColumnDefs(this.columnDefs);
    this.gridApi.sizeColumnsToFit();

    this.appService.getTransactions().subscribe(res => {
      this.gridApi.setRowData(res);
    });

    this.appService.getCategories().subscribe(res => {
      this.categories = res;
      console.log('categories = ', this.categories);
    });
  }

  onRowEditingStopped(params: RowEvent) {
    console.log('onRowEditingStopped', params);
  }

  onRowValueChanged(params: RowEvent) {
    console.log('onRowValueChanged', params);
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
