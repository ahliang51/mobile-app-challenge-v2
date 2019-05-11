import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EApplicationService } from 'src/app/services/e-application.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-e-application',
  templateUrl: './e-application.page.html',
  styleUrls: ['./e-application.page.scss'],
})
export class EApplicationPage implements OnInit {

  startDate = moment().format('L');
  endDate = moment().format('L');


  approvingCommanderOptions = {
    header: 'Select Commander'
  };

  customActionSheetOptions: any = {
    header: 'Number of Days'
  };

  offBalance;
  commandersSelection = [];
  commandersArray = [];
  eApplication: FormGroup;
  userId;


  constructor(public storage: Storage,
    public eApplicationService: EApplicationService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router,
    public formBuilder: FormBuilder) {
    this.eApplication = this.formBuilder.group({
      startDate: [this.startDate, Validators.required],
      endDate: [this.endDate, Validators.required],
      approvingCommander: ['', Validators.required],
      numberOfDays: [0.5, Validators.required],
      reason: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.presentLoading();
    this.storage.get('userId').then(userId => {
      this.userId = userId;
      this.eApplicationService.retrievePersonnel({
        userId: userId,
        appointment: 'commander'
      }).subscribe(commanders => {
        commanders.map(commander => {
          this.commandersSelection.push(commander.rank + ' ' + commander.firstName);
          this.commandersArray.push(commander);
        });
      });

      this.eApplicationService.retrieveOffBalance(userId).subscribe(balance => {
        this.loadingController.dismiss();
        if (balance.offBalance) {
          this.offBalance = balance.offBalance;
        } else {
          this.offBalance = 0;
        }
      });
    });
  }

  daysChange(value) {
    // tslint:disable-next-line:radix
    if (parseFloat(value) > parseFloat(this.offBalance)) {
      this.eApplication.controls['numberOfDays'].setErrors({ 'incorrect': true });
    } else {
      this.eApplication.controls['numberOfDays'].setErrors(null);
    }
  }

  // onStartDateChange(value) {
  //   if (!this.validateDate(value, this.eApplication.controls['endDate'].value)) {
  //     this.eApplication.controls['startDate'].setErrors({ 'incorrect': true });
  //   } else {
  //     this.eApplication.controls['startDate'].setErrors({ 'incorrect': false });
  //   }
  // }

  // onEndDateChange(value) {
  //   if (!this.validateDate(value, this.eApplication.controls['startDate'].value)) {
  //     this.eApplication.controls['startDate'].setErrors({ 'incorrect': true });
  //   } else {
  //     this.eApplication.controls['startDate'].setErrors({ 'incorrect': false });
  //   }
  // }


  eApplicationForm() {
    this.presentLoading();
    this.eApplication.value.applicantId = this.userId;
    this.eApplication.value.approvingCommander = this.commandersArray[this.eApplication.value.approvingCommander]._id;
    this.eApplication.value.startDate = new Date(this.eApplication.value.startDate);
    this.eApplication.value.endDate = new Date(this.eApplication.value.endDate);
    console.log(this.eApplication.value);
    this.eApplicationService.applicationOfOff(this.eApplication.value).subscribe(result => {
      console.log(result)
      this.loadingController.dismiss();
      if (result.success) {
        this.presentToast();
        this.router.navigateByUrl('/home');
      }
    })
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully Applied',
      duration: 2000,
      position: 'top'
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
