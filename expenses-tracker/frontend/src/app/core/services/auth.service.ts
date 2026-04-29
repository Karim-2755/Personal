import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('expense_tracker_token');
    if (token) {
      this.loadProfile().subscribe();
    }
  }

  register(user: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('expense_tracker_token', response.token);
      }),
      tap(() => this.loadProfile().subscribe())
    );
  }

  loadProfile(): Observable<User | null> {
    return this.http.get<User>(`${environment.apiUrl}/auth/profile`).pipe(
      tap((profile) => this.userSubject.next(profile)),
      map((profile) => profile)
    );
  }

  logout(): void {
    localStorage.removeItem('expense_tracker_token');
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('expense_tracker_token');
  }
}
