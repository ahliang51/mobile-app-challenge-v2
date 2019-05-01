import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommanderGrantComponent } from './commander-grant.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CommanderGrantComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule
  ],
  exports: [CommanderGrantComponent]
})
export class CommanderGrantComponentsModule { }
