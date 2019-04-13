import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-e-application',
  templateUrl: './e-application.page.html',
  styleUrls: ['./e-application.page.scss'],
})
export class EApplicationPage implements OnInit {

  customActionSheetOptions: any = {
    header: 'Number of Days'
  };

  constructor() {

  }

  ngOnInit() {
  }

}
