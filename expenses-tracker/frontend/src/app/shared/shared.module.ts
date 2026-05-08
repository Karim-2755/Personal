import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [LoaderComponent, NavbarComponent, SidebarComponent],
  imports: [CommonModule, RouterModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule],
  exports: [LoaderComponent, NavbarComponent, SidebarComponent]
})
export class SharedModule {}
