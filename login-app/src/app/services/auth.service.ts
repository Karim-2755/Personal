import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<string | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.isLoggedInSubject.next(true);
      this.currentUserSubject.next(savedUser);
    }
  }

  login(credentials: LoginCredentials): boolean {
    if (credentials.username && credentials.password) {
      this.isLoggedInSubject.next(true);
      this.currentUserSubject.next(credentials.username);
      localStorage.setItem('currentUser', credentials.username);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}
