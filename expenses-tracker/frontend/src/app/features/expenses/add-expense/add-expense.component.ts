import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseService } from '../../../core/services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent {
  loading = false;
  error = '';

  form = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    category: ['', Validators.required],
    date: [new Date(), Validators.required],
    note: ['']
  });

  categories = ['Food', 'Transport', 'Bills', 'Shopping', 'Other'];

  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private router: Router) {}

  submit(): void {
    if (this.form.invalid) {
      this.error = 'Please fill all required fields.';
      return;
    }

    this.loading = true;
    const expense = { ...this.form.value, date: this.form.value.date.toISOString() };
    this.expenseService.create(expense).subscribe({
      next: () => this.router.navigate(['/expenses']),
      error: (err) => {
        this.error = err.error || err.message || 'Unable to save expense.';
        this.loading = false;
      }
    });
  }
}
