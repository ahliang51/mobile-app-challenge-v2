import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommanderHomeComponent } from './commander-home.component';



@NgModule({
 declarations: [CommanderHomeComponent],
 imports: [
  CommonModule,
  IonicModule,
  FontAwesomeModule
 ],
 exports: [CommanderHomeComponent]
})
export class CommanderHomeComponentsModule { }
