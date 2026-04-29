import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, User } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  currentUser: string | null = null;
  showAddForm = false;
  editingId: number | null = null;
  formData = { name: '', email: '', phone: '' };
  searchTerm = '';

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.dataService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  get filteredUsers(): User[] {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddForm() {
    this.showAddForm = true;
    this.editingId = null;
    this.formData = { name: '', email: '', phone: '' };
  }

  openEditForm(user: User) {
    this.showAddForm = true;
    this.editingId = user.id;
    this.formData = { name: user.name, email: user.email, phone: user.phone };
  }

  closeForm() {
    this.showAddForm = false;
    this.editingId = null;
    this.formData = { name: '', email: '', phone: '' };
  }

  saveUser() {
    if (!this.formData.name || !this.formData.email || !this.formData.phone) {
      alert('Please fill all fields');
      return;
    }

    if (this.editingId) {
      this.dataService.updateUser(this.editingId, this.formData);
    } else {
      this.dataService.addUser(this.formData);
    }

    this.closeForm();
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.dataService.deleteUser(id);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
