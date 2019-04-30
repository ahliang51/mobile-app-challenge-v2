import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit() {
  }

  onDateChanged() {
    this.personnelArray = [
      { name: 'LTA Hosehbo', present: false, remarks: 'On Off' },
      { name: 'LTA Hosehliao', present: true, remarks: '' },
      { name: 'LTA Hosehkao', present: true, remarks: '' },
      { name: 'LTA Hosehboliao', present: false, remarks: 'On MA' }
    ];
  }

}
