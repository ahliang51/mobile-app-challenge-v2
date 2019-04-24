import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-e-ration',
  templateUrl: './e-ration.page.html',
  styleUrls: ['./e-ration.page.scss'],
})
export class ERationPage implements OnInit {

  // tslint:disable-next-line:radix
  nextWeekNumber = parseInt(moment().subtract(3, 'days').format('W')) + 1;
  daysArray = [];
  customRationOptions: any = {
    header: 'Select '
  };

  constructor() { }

  ngOnInit() {

    async function getWeekDays(daysArray, nextWeekNumber) {
      for (let i = 1; i <= 5; i++) {
        await daysArray.push(moment().isoWeekday(i).week(nextWeekNumber).format('dddd Do MMMM YYYY'));
      }

      return daysArray;
    }
    getWeekDays(this.daysArray, this.nextWeekNumber).then(result => {
      this.daysArray = result;
      console.log(this.daysArray);
    }
    );
    // console.log(moment().isoWeekday(1).week(this.nextWeekNumber));
    // console.log(moment().isoWeekday(2).week(this.nextWeekNumber));
  }

}
