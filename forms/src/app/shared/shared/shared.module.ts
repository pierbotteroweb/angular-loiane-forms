import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';
import { ErrorMsgComponent } from '../error-msg/error-msg.component';

@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent
  ]
})
export class SharedModule { }
