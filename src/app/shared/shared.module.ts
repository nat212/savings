import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [CommonModule, FlexLayoutModule, GridModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterModule],
  exports: [FlexLayoutModule, GridModule, ReactiveFormsModule, BreadcrumbsComponent],
})
export class SharedModule {}
