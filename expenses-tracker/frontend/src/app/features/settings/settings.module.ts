import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({ declarations: [SettingsComponent], imports: [CommonModule, ReactiveFormsModule, SettingsRoutingModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule] })
export class SettingsModule {}
