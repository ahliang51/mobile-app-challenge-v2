import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ERationService } from '../services/e-ration.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-e-ration',
  templateUrl: './e-ration.page.html',
  styleUrls: ['./e-ration.page.scss'],
})
export class ERationPage implements OnInit {

  // tslint:disable-next-line:radix
  nextWeekNumber = parseInt(moment().format('W')) + 1;
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
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router,
    public eRationService: ERationService) { }

  ngOnInit() {
    this.presentLoading();
    this.storage.get('userId').then(userId => {
      this.userId = userId;
      this.eRationService.checkRationSubmitted({
        userId: userId,
        weekNumber: this.nextWeekNumber
      }).subscribe(result => {
        console.log(result)
        this.rationExist = result.success
        this.loadingController.dismiss();
        if (!result.success) {
          getWeekDays(this.viewDaysArray, this.saveDaysArray, this.nextWeekNumber).then(result => {
            this.viewDaysArray = result;
          }
          );
        }
        else {
          this.presentToast('You have already indented rations', 'bottom');
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
    this.presentLoading();
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
      this.loadingController.dismiss();
      this.presentToast('Successfully indented', 'bottom');
      this.router.navigateByUrl('/home');
    })
    console.log(consolidatedArray);
  }


  async presentToast(message, position) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
    });
    await loading.present();
  }

}
