import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReportsComponent],
  imports: [CommonModule, ReactiveFormsModule, ChartsModule, ReportsRoutingModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule]
})
export class ReportsModule {}
