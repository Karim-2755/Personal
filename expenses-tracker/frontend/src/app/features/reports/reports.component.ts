import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { registerables } from 'chart.js';
import { ExpenseService } from '../../core/services/expense.service';

Chart.register(...registerables);

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  dateRangeForm = this.fb.group({ from: [''], to: [''] });
  monthlyData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  categoryData: ChartConfiguration<'pie'>['data'] = { labels: [], datasets: [] };
  summary = { total: 0, categories: 0 };

  chartOptions: ChartOptions<'bar'> = { responsive: true }; 
  pieOptions: ChartOptions<'pie'> = { responsive: true };

  constructor(private fb: FormBuilder, private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadCharts();
  }

  loadCharts(): void {
    this.expenseService.monthly().subscribe((response) => {
      this.monthlyData = {
        labels: response.map((item: any) => item.month),
        datasets: [{ data: response.map((item: any) => item.total), label: 'Monthly Total', backgroundColor: '#2563eb' }]
      };
      this.summary.total = response.reduce((sum: number, item: any) => sum + item.total, 0);
    });

    this.expenseService.category().subscribe((response) => {
      this.categoryData = {
        labels: response.map((item: any) => item.category),
        datasets: [{ data: response.map((item: any) => item.total), backgroundColor: ['#2563eb', '#eab308', '#10b981', '#f97316', '#ec4899'] }]
      };
      this.summary.categories = response.length;
    });
  }

  applyRange(): void {
    const range = this.dateRangeForm.value;
    const fromDate = range.from ? new Date(range.from).toISOString() : '';
    const toDate = range.to ? new Date(range.to).toISOString() : '';
    this.expenseService.list({ from: fromDate, to: toDate }).subscribe((data) => {
      this.summary.total = data.reduce((sum, item) => sum + item.amount, 0);
    });
  }
}
