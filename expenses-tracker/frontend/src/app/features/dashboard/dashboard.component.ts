import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totals = { today: 0, month: 0, total: 0, highestCategory: '' };
  recentExpenses: any[] = [];
  loading = true;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.list().subscribe({
      next: (expenses) => {
        this.recentExpenses = expenses
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        const monthExpenses = expenses.filter((expense) => new Date(expense.date).getMonth() === new Date().getMonth());
        const todayExpenses = expenses.filter((expense) => {
          const date = new Date(expense.date);
          const today = new Date();
          return date.toDateString() === today.toDateString();
        });

        this.totals.today = todayExpenses.reduce((sum, item) => sum + item.amount, 0);
        this.totals.month = monthExpenses.reduce((sum, item) => sum + item.amount, 0);
        this.totals.total = expenses.reduce((sum, item) => sum + item.amount, 0);

        const categoryTotals = expenses.reduce((acc: Record<string, number>, item) => {
          acc[item.category] = (acc[item.category] || 0) + item.amount;
          return acc;
        }, {});
        this.totals.highestCategory = Object.keys(categoryTotals).sort((a, b) => categoryTotals[b] - categoryTotals[a])[0] || 'None';
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
