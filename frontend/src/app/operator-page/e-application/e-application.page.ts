import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-e-application',
  templateUrl: './e-application.page.html',
  styleUrls: ['./e-application.page.scss'],
})
export class EApplicationPage implements OnInit {

  startDate: String = new Date().toISOString();
  endDate: String = new Date().toISOString();

  approvingCommanderOptions = {
    header: 'Select Commander'
  };

  customActionSheetOptions: any = {
    header: 'Number of Days'
  };

  commanderOptions = ['LTA Yoho1', '2WO CANG'];

  constructor() {

  }

  ngOnInit() {
  }

}
