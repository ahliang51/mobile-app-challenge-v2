import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userName;
  password;
  appointment;

  constructor(public router: Router,
    public registrationService: RegistrationService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public storage: Storage) { }

  ngOnInit() {
    this.appointment = 'commander';
    this.userName = 'commander-alpha'
    this.password = '123';
  }

  login() {
    this.presentLoading();
    this.registrationService.login({
      username: this.userName,
      password: this.password
    }).subscribe(result => {
      console.log(result);
      this.loadingController.dismiss();
      if (result.success) {
        this.storage.set('userId', result.userId);
        this.storage.set('appointment', result.appointment).then(result => {
          this.router.navigateByUrl('/home');
        });
      }
      else {
        this.presentToast();
      }
    });
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  onAppointmentChange(value) {
    if (value == 'commander') {
      this.userName = 'commander-alpha'
    } else {
      this.userName = 'operator-alpha'
    }

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
    });
    await loading.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Wrong Credentials',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
