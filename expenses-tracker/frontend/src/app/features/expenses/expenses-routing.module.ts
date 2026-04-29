import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';

const routes: Routes = [
  { path: '', component: ExpenseListComponent },
  { path: 'add', component: AddExpenseComponent },
  { path: 'edit/:id', component: EditExpenseComponent }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ExpensesRoutingModule {}
