import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommanderApprovalComponent } from './commander-approval.component';



@NgModule({
 declarations: [CommanderApprovalComponent],
 imports: [
  CommonModule,
  IonicModule,
  FontAwesomeModule
 ],
 exports: [CommanderApprovalComponent]
})
export class CommanderApprovalComponentsModule { }
