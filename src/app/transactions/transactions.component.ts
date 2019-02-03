import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { Transaction } from '../models/transaction';
import { RowEvent, AgGridEvent, ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { Category } from '../models/category';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, AfterViewInit {

  gridApi: GridApi;
  gridColumnApi: ColumnApi;

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

  blankTransaction: Transaction = new Transaction({ id: '', title: '', category: '', amount: 0.00 });

  constructor(private appService: AppService) { }

  ngOnInit() { }

  ngAfterViewInit() { }

  onGridReady(params: AgGridEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.setColumnDefs(this.columnDefs);
    this.gridApi.setSortModel([{ colId: 'date', sort: 'desc' }]);
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setPinnedTopRowData([ this.blankTransaction ]);

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
    const trans = params.data as Transaction;

    if (!trans.id) {
      this.appService.createTransaction(trans).subscribe(res => {
        this.gridApi.updateRowData({ add: [res] });
        this.blankTransaction.deserialize({ id: '', title: '', category: '', amount: 0.00 });
        this.gridApi.setPinnedTopRowData([ this.blankTransaction ]);
      });
    } else {
      this.appService.updateTransaction(trans).subscribe();
    }
  }

}
