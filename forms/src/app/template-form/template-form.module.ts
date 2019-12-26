import { FormDebugComponent } from './../form-debug/form-debug.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateFormComponent } from './template-form.component';

@NgModule({
  declarations: [
    TemplateFormComponent,
    FormDebugComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TemplateFormModule { }
