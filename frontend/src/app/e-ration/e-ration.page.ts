import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ERationService } from '../services/e-ration.service';

@Component({
  selector: 'app-e-ration',
  templateUrl: './e-ration.page.html',
  styleUrls: ['./e-ration.page.scss'],
})
export class ERationPage implements OnInit {

  // tslint:disable-next-line:radix
  nextWeekNumber = parseInt(moment().subtract(3, 'days').format('W')) + 1;
  viewDaysArray = [];
  saveDaysArray = [];
  rationArray = [['breakfast', 'lunch', 'dinner'],
  ['breakfast', 'lunch', 'dinner'],
  ['breakfast', 'lunch', 'dinner'],
  ['breakfast', 'lunch', 'dinner'],
  ['breakfast', 'lunch', 'dinner']];
  customRationOptions: any = {
    header: 'Select '
  };

  toppings;
  userId;
  rationExist: boolean = true;

  constructor(public storage: Storage,
    public eRationService: ERationService) { }

  ngOnInit() {

    this.storage.get('userId').then(userId => {
      this.userId = userId;
      this.eRationService.checkRationSubmitted({
        userId: userId,
        weekNumber: this.nextWeekNumber
      }).subscribe(result => {
        console.log(result)
        this.rationExist = result.success
        if (!result.success) {
          getWeekDays(this.viewDaysArray, this.saveDaysArray, this.nextWeekNumber).then(result => {
            this.viewDaysArray = result;
          }
          );
        }
      })
    })



    async function getWeekDays(viewDaysArray, saveDaysArray, nextWeekNumber) {
      for (let i = 1; i <= 5; i++) {
        await viewDaysArray.push(moment().isoWeekday(i).week(nextWeekNumber).format('dddd Do MMMM YYYY'));
        await saveDaysArray.push(moment().isoWeekday(i).week(nextWeekNumber).format('L'));
      }

      return viewDaysArray;
    }
  }

  submit() {
    let consolidatedArray = [];
    // tslint:disable-next-line: forin
    for (let day in this.saveDaysArray) {
      let temp = [this.saveDaysArray[day], this.rationArray[day]];
      consolidatedArray.push(temp);

    }
    this.eRationService.submitRation({
      userId: this.userId,
      weekNumber: this.nextWeekNumber,
      rations: consolidatedArray
    }).subscribe(result => {
      console.log(result)
    })
    console.log(consolidatedArray);
  }

}
