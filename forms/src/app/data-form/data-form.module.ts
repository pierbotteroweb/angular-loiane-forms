import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFormComponent } from './data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared/shared.module';
import { HttpModule } from '@angular/http';
import { DropdownService } from '../shared/services/dropdown.service';

@NgModule({
  declarations: [
    DataFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule
  ],
  providers: [ DropdownService]
})
export class DataFormModule { }
