import { Component, OnInit } from '@angular/core';
import { faWpforms } from '@fortawesome/free-brands-svg-icons';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  faWpForms = faWpforms;
  appointment;
  constructor(public storage: Storage) {

  }

  ngOnInit() {
    this.storage.get('appointment').then(appointment => {
      this.appointment = appointment;
    });
  }
}
