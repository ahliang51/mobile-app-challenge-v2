import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OperatorHomeComponent } from './operator-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [OperatorHomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule
  ],
  exports: [OperatorHomeComponent]
})
export class OperatorHomeComponentsModule { }
