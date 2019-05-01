import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  rankOptions = {
    header: 'Select your rank'
  };
  rankAppointment = [
    'MAJ', 'CPT', 'LTA', '2LT', '1WO', '2WO', '3WO', 'MSG', 'SSG', '1SG', '2SG', '3SG', 'CFC',
    'CPL', 'LCP', 'PTE'
  ];

  units: any = [];
  camps: any[] = [];
  companys: any[] = [];
  registration: FormGroup;

  constructor(public registrationService: RegistrationService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router,
    public formBuilder: FormBuilder) {
    this.registration = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['123', Validators.required],
      rank: ['', Validators.required],
      unit: ['', Validators.required],
      company: ['', Validators.required],
      appointment: ['operator', Validators.required]
    });
  }

  ngOnInit() {
    this.registrationService.retrieveCamp().subscribe(camps => {
      this.camps = camps;
      camps.map(camp => {
        this.units.push(camp.unit);
      });
    });
  }

  onUnitChange(unit) {
    this.camps.map(camp => {
      if (unit === camp.unit) {
        this.companys = camp.companys;
      }
    });
  }

  registrationForm() {
    this.presentLoading();
    this.registrationService.signUp(this.registration.value).subscribe(result => {
      if (result.success) {
        this.presentToast();
        this.loadingController.dismiss();
        this.router.navigateByUrl('/login');
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Sign Up Successfully',
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
