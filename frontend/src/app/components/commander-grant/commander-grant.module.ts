import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommanderGrantComponent } from './commander-grant.component';



@NgModule({
 declarations: [CommanderGrantComponent],
 imports: [
  CommonModule,
  IonicModule,
  FontAwesomeModule
 ],
 exports: [CommanderGrantComponent]
})
export class CommanderGrantComponentsModule { }
