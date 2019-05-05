import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { EParadeService } from '../services/e-parade.service';

import * as moment from 'moment';

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

  constructor(public eParadeService: EParadeService) { }

  ngOnInit() {
  }

  onDateChanged() {
    console.log(this.date)
    console.log(moment(this.date).toISOString())
    this.eParadeService.retrieveParadeState({
      date: new Date(this.date)
    }).subscribe(result => {
      console.log(result)
      this.personnelArray = result;
    })
    // this.personnelArray = [
    //   { name: 'LTA Hosehbo', present: false, remarks: 'On Off' },
    //   { name: 'LTA Hosehliao', present: true, remarks: '' },
    //   { name: 'LTA Hosehkao', present: true, remarks: '' },
    //   { name: 'LTA Hosehboliao', present: false, remarks: 'On MA' }
    // ];
  }

}
