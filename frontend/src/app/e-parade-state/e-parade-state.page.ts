import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { EParadeService } from '../services/e-parade.service';

import * as moment from 'moment';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-e-parade-state',
  templateUrl: './e-parade-state.page.html',
  styleUrls: ['./e-parade-state.page.scss'],
})
export class EParadeStatePage implements OnInit {

  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  date;

  personnelArray = [];

  constructor(public eParadeService: EParadeService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router, ) { }

  ngOnInit() {
  }

  onDateChanged() {
    this.presentLoading();
    console.log(this.date)
    console.log(moment(this.date).toISOString())
    this.eParadeService.retrieveParadeState({
      date: new Date(this.date)
    }).subscribe(result => {
      console.log(result)
      this.loadingController.dismiss();
      this.personnelArray = result;
    })
    // this.personnelArray = [
    //   { name: 'LTA Hosehbo', present: false, remarks: 'On Off' },
    //   { name: 'LTA Hosehliao', present: true, remarks: '' },
    //   { name: 'LTA Hosehkao', present: true, remarks: '' },
    //   { name: 'LTA Hosehboliao', present: false, remarks: 'On MA' }
    // ];
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
