import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AgGridMaterialTextEditorComponent } from '../ag-grid-editors/ag-grid-material-text-editor/ag-grid-material-text-editor.component';
import { AgGridMaterialSelectEditorComponent } from '../ag-grid-editors/ag-grid-material-select-editor/ag-grid-material-select-editor.component';
import { AgGridMaterialCheckboxCellComponent } from '../ag-grid-editors/ag-grid-material-checkbox-cell/ag-grid-material-checkbox-cell.component';
import { AgGridMaterialDatepickerEditorComponent } from '../ag-grid-editors/ag-grid-material-datepicker-editor/ag-grid-material-datepicker-editor.component';
import * as moment from 'moment';

import { AppService } from '../app.service';
import { Transaction } from '../models/transaction';
import { RowEvent, AgGridEvent, ColDef, GridApi, ColumnApi, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { Category } from '../models/category';
import { Observable, forkJoin } from 'rxjs';
import { headersToString } from 'selenium-webdriver/http';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, AfterViewInit {

  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  categories: Category[];
  blankTransaction: Transaction = new Transaction({ id: '', description: '', category: '', amount: 0.00 });

  columnDefs: ColDef[] = [
    {
      headerName: 'Description',
      field: 'description',
      // cellEditorFramework: AgGridMaterialTextEditorComponent
    },
    {
      headerName: 'Date',
      field: 'date',
      cellEditorFramework: AgGridMaterialDatepickerEditorComponent,
      valueFormatter: (data) => data.value ? (data.value as moment.Moment).format('L') : null
    },
    {
      headerName: 'Category',
      field: 'categoryId',
      // cellEditorFramework: AgGridMaterialSelectEditorComponent,
      cellEditor: 'agSelectCellEditor',
      // valueGetter = (valParams) => this.categoryGetter(valParams)
      valueFormatter: (valParams) => this.categoryFormatter(valParams)
    },
    {
      headerName: 'Amount',
      field: 'amount',
      type: 'numericColumn',
      // cellEditorFramework: AgGridMaterialTextEditorComponent,
      valueFormatter: (params) => this.currencyFormatter(params)
    }
  ];

  defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    resizable: true,
    heaaderClass: '.header',
    cellClass: 'cellStyle'
  };

  constructor(private appService: AppService) { }

  ngOnInit() { }

  ngAfterViewInit() { }

  onGridReady(params: AgGridEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.setColumnDefs(this.columnDefs);
    this.gridApi.setSortModel([{ colId: 'date', sort: 'desc' }]);
    this.gridApi.sizeColumnsToFit();

    const requests: Array<Observable<any>> = new Array<Observable<any>>();
    requests.push(this.appService.getTransactions());
    requests.push(this.appService.getCategories());
    forkJoin(requests).subscribe(res => {
      this.categories = res[1];
      const colDef = this.gridColumnApi.getColumn('categoryId').getColDef();
      // colDef.cellEditorParams = { values: this.categories.map(x => ({key: x.id, value: x.name})) };
      colDef.cellEditorParams = { values: this.categories.map(x => x.name) };

      this.gridApi.setPinnedTopRowData([this.blankTransaction]);

      this.gridApi.setRowData(res[0]);
    });

  }

  // categoryGetter(params: ValueGetterParams) {
  //   const cat = this.categories.find(x => x.id === params.data.categoryId);
  //   if (!cat) {
  //     console.log('category not found!');
  //     return '';
  //   } else {
  //     console.log(`${params.data.categoryId} = ${cat.name}`);
  //     return cat.name;
  //   }
  // }

  categoryFormatter(params: ValueFormatterParams): string {
    const cat = this.categories.find(x => x.id === params.value);
    if (!cat) {
      console.log('category not found!');
      return '';
    } else {
      console.log(`${params.value} = ${cat.name}`);
      return cat.name;
    }
  }

  currencyFormatter(params) {
    return '$' + (<number>params.value).toLocaleString('en-us', {minimumFractionDigits: 2});
  }

  onRowValueChanged(params: RowEvent) {
    console.log('onRowValueChanged', params);
    const trans = params.data as Transaction;

    if (!trans.id) {
      this.appService.createTransaction(trans).subscribe(res => {
        this.gridApi.updateRowData({ add: [res] });
        this.blankTransaction.deserialize({ id: '', description: '', category: '', amount: 0.00 });
        this.gridApi.setPinnedTopRowData([this.blankTransaction]);
      });
    } else {
      this.appService.updateTransaction(trans).subscribe();
    }
  }

}

