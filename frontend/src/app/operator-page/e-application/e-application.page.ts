import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EApplicationService } from 'src/app/services/e-application.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';

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
    this.eApplication.value.applicantId = this.userId;
    this.eApplication.value.approvingCommander = this.commandersArray[this.eApplication.value.approvingCommander]._id;
    this.eApplication.value.startDate = new Date(this.eApplication.value.startDate);
    this.eApplication.value.endDate = new Date(this.eApplication.value.endDate);
    console.log(this.eApplication.value);
    this.eApplicationService.applicationOfOff(this.eApplication.value).subscribe(result => {
      console.log(result)
    })
  }


  // validateDate(startDate, endDate) {
  //   const tempStart = moment(startDate).format('YYYY-MM-DDTHH:mm:ssZ');
  //   const tempEnd = moment(endDate).format('YYYY-MM-DDTHH:mm:ssZ');

  //   console.log(tempStart);
  //   console.log(tempEnd);

  //   console.log(moment(startDate).isBefore(tempEnd, 'day'));

  //   if (moment(startDate).isSameOrBefore(tempEnd, 'day')) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
