import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../core/services/expense.service';
import { Expense } from '../../../models/expense.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  loading = true;
  search = '';
  category = '';
  from = '';
  to = '';

  constructor(private expenseService: ExpenseService, public router: Router) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.loading = true;
    this.expenseService.list({ search: this.search, category: this.category, from: this.from, to: this.to }).subscribe({
      next: (data) => {
        this.expenses = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  remove(id?: string): void {
    if (!id || !confirm('Delete this expense?')) {
      return;
    }
    this.expenseService.delete(id).subscribe(() => this.loadExpenses());
  }
}
