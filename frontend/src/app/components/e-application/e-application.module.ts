import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EApplicationComponent } from './e-application.component';
import { FormsModule } from '@angular/forms';

@NgModule({
 declarations: [EApplicationComponent],
 imports: [
  CommonModule,
  IonicModule,
  FontAwesomeModule,
  FormsModule
 ],
 exports: [EApplicationComponent]
})
export class EApplicationComponentModule { }
