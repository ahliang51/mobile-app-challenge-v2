import { Component, OnInit } from '@angular/core';
import { EApplicationService } from 'src/app/services/e-application.service';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-commander-approval',
  templateUrl: './commander-approval.component.html',
  styleUrls: ['./commander-approval.component.scss'],
})
export class CommanderApprovalComponent implements OnInit {

  personnelArray = [];
  userId;

  constructor(public eApplicationService: EApplicationService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public storage: Storage) { }

  ngOnInit() {
    this.presentLoading();
    this.storage.get('userId').then(userId => {
      this.userId = userId;
      this.eApplicationService.retrievePendingOff({
        userId: userId
      }).subscribe(result => {
        console.log(result)
        this.loadingController.dismiss();
        this.personnelArray = result;
      })
    })
  }

  approve(index) {
    this.presentLoading();
    this.eApplicationService.approveOff({
      userId: this.userId,
      document: this.personnelArray[index]
    }).subscribe(result => {
      this.loadingController.dismiss();
      console.log(result)
      this.presentToast('You have approved!', 'bottom');
      this.personnelArray = [];
      this.ngOnInit();
    })
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
