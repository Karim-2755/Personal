import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ReportsComponent],
  imports: [CommonModule, ReactiveFormsModule, ReportsRoutingModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, NgChartsModule]
})
export class ReportsModule {}
