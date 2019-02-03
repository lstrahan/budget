import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from "ag-grid-angular/main";
import { ICellRendererParams } from "ag-grid-community";

@Component({
  selector: 'app-ag-grid-material-checkbox-cell',
  template: `<mat-checkbox (change)="toggleSelection($event)"></mat-checkbox>`
})
export class AgGridMaterialCheckboxCellComponent implements OnInit, AgRendererComponent {
    private params: ICellRendererParams;
    refresh(params: any): boolean {
        return true;
    }

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    constructor() { }

    ngOnInit() {
    }

    toggleSelection(event) {
        this.params.node.setSelected(event.checked);
    }

}
