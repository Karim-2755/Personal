import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../../core/services/expense.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {
  loading = false;
  error = '';
  id = '';
  categories = ['Food', 'Transport', 'Bills', 'Shopping', 'Other'];

  form = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    category: ['', Validators.required],
    date: [new Date(), Validators.required],
    note: ['']
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private expenseService: ExpenseService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (!this.id) {
      this.router.navigate(['/expenses']);
      return;
    }

    this.expenseService.getById(this.id).subscribe((expense) => {
      this.form.patchValue({
        amount: expense.amount,
        category: expense.category,
        date: new Date(expense.date),
        note: expense.note
      });
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.error = 'Please fill all required fields.';
      return;
    }

    this.loading = true;
    const expense = { ...this.form.value, date: this.form.value.date.toISOString() };
    this.expenseService.update(this.id, expense).subscribe({
      next: () => this.router.navigate(['/expenses']),
      error: (err) => {
        this.error = err.error || err.message || 'Unable to update expense.';
        this.loading = false;
      }
    });
  }
}
