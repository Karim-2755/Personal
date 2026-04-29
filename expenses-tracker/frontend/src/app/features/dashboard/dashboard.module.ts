import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({ declarations: [DashboardComponent], imports: [CommonModule, DashboardRoutingModule, MatCardModule, MatIconModule, MatButtonModule] })
export class DashboardModule {}
