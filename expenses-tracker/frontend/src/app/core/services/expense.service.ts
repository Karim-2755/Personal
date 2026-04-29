import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Expense } from '../../models/expense.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private readonly baseUrl = `${environment.apiUrl}/expenses`;

  constructor(private http: HttpClient) {}

  list(query: { search?: string; category?: string; from?: string; to?: string } = {}): Observable<Expense[]> {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        params = params.set(key, value);
      }
    });
    return this.http.get<Expense[]>(this.baseUrl, { params });
  }

  getById(id: string): Observable<Expense> {
    return this.http.get<Expense>(`${this.baseUrl}/${id}`);
  }

  create(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.baseUrl, expense);
  }

  update(id: string, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.baseUrl}/${id}`, expense);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }

  monthly(): Observable<any> {
    return this.http.get(`${this.baseUrl}/monthly`);
  }

  category(): Observable<any> {
    return this.http.get(`${this.baseUrl}/category`);
  }
}
