import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EApplicationService } from 'src/app/services/e-application.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-commander-grant',
  templateUrl: './commander-grant.component.html',
  styleUrls: ['./commander-grant.component.scss'],
})
export class CommanderGrantComponent implements OnInit {

  operatorConfiguration = {
    header: 'Select Operator'
  };

  customActionSheetOptions: any = {
    header: 'Number of Days'
  };

  operatorArray = [];
  operatorSelection = [];
  numberOfDays: Number;
  operatorIndex;

  constructor(public eApplicationService: EApplicationService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public storage: Storage, ) { }

  ngOnInit() {
    this.presentLoading();
    this.storage.get('userId').then(userId => {
      this.eApplicationService.retrievePersonnel({
        userId: userId,
        appointment: 'operator'
      }).subscribe(operators => {
        operators.map(operator => {
          console.log(operator)
          this.loadingController.dismiss();
          this.operatorSelection.push(operator.rank + ' ' + operator.firstName);
          this.operatorArray.push(operator);
        });
      });
    });
  }

  onSubmit() {
    this.presentLoading();
    console.log(this.operatorArray[this.operatorIndex]);
    this.eApplicationService.updateOffBalance({
      userId: this.operatorArray[this.operatorIndex]._id,
      numberOfOff: this.numberOfDays
    }).subscribe(result => {
      if (result.success) {
        this.loadingController.dismiss();
        this.presentToast('Successully granted Off');
      }
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
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
