import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';
import { CategoriesComponent } from './categories/categories.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: 'transactions',
    component: TransactionsComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
