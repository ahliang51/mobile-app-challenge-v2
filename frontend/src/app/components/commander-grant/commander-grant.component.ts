import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commander-grant',
  templateUrl: './commander-grant.component.html',
  styleUrls: ['./commander-grant.component.scss'],
})
export class CommanderGrantComponent implements OnInit {

  operatorConfiguration = {
    header: 'Select Commander'
  };

  customActionSheetOptions: any = {
    header: 'Number of Days'
  };

  operatorArray = ['CPL Yoho1', 'LCP CANG'];

  constructor() { }

  ngOnInit() { }

}
