import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
