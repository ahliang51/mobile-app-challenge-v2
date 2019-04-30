import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommanderEApplicationPage } from './commander-e-application.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommanderApprovalComponentsModule } from '../../components/commander-approval/commander-approval.module';
import { CommanderGrantComponentsModule } from '../../components/commander-grant/commander-grant.module';



const routes: Routes = [
  {
    path: '',
    component: CommanderEApplicationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    CommanderApprovalComponentsModule,
    CommanderGrantComponentsModule
  ],
  declarations: [CommanderEApplicationPage]
})
export class CommanderEApplicationPageModule { }
