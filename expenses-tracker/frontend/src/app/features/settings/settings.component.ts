import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });
  darkMode = false;
  success = '';
  error = '';

  constructor(private fb: FormBuilder) {}

  toggleDarkMode(checked: boolean): void {
    this.darkMode = checked;
    document.body.classList.toggle('dark-mode', this.darkMode);
  }

  updatePassword(): void {
    this.error = '';
    this.success = '';
    if (this.passwordForm.invalid || this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      this.error = 'Please ensure passwords match and are valid.';
      return;
    }
    this.success = 'Password update requested. Backend integration pending.';
  }
}
