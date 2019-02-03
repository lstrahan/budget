import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AgGridModule } from 'ag-grid-angular';

import { AgGridMaterialTextEditorComponent } from './ag-grid-editors/ag-grid-material-text-editor/ag-grid-material-text-editor.component';
import { AgGridMaterialSelectEditorComponent } from './ag-grid-editors/ag-grid-material-select-editor/ag-grid-material-select-editor.component';
import { AgGridMaterialCheckboxCellComponent } from './ag-grid-editors/ag-grid-material-checkbox-cell/ag-grid-material-checkbox-cell.component';
import { AgGridMaterialDatepickerEditorComponent } from './ag-grid-editors/ag-grid-material-datepicker-editor/ag-grid-material-datepicker-editor.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockServiceInterceptor } from './mock-service/mock-service.interceptor';
import { TransactionsComponent } from './transactions/transactions.component';
import { ReportsComponent } from './reports/reports.component';
import { CategoriesComponent } from './categories/categories.component';
import { AppService } from './app.service';
import { DateFormatPipe } from './pipes';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    ReportsComponent,
    CategoriesComponent,
    DateFormatPipe,
    AgGridMaterialTextEditorComponent,
    AgGridMaterialSelectEditorComponent,
    AgGridMaterialCheckboxCellComponent,
    AgGridMaterialDatepickerEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatMomentDateModule,
    FlexLayoutModule,
    AgGridModule.withComponents([
      AgGridMaterialTextEditorComponent,
      AgGridMaterialSelectEditorComponent,
      AgGridMaterialCheckboxCellComponent,
      AgGridMaterialDatepickerEditorComponent
    ])
  ],
  providers: [
    AppService,
    { provide: HTTP_INTERCEPTORS, useClass: MockServiceInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
