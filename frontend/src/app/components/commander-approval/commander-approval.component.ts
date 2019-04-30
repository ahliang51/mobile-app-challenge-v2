import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commander-approval',
  templateUrl: './commander-approval.component.html',
  styleUrls: ['./commander-approval.component.scss'],
})
export class CommanderApprovalComponent implements OnInit {

  personnelArray = [
    { name: 'LTA Hosehbo', remarks: 'On Off', dateFrom: '11/2/2019', dateTo: '13/2/2019', numberOfDays: 2 },
    { name: 'LTA Hosehliao', remarks: '', dateFrom: '11/2/2019', dateTo: '13/2/2019', numberOfDays: 2 },
    { name: 'LTA Hosehkao', remarks: '', dateFrom: '11/2/2019', dateTo: '13/2/2019', numberOfDays: 2 },
    { name: 'LTA Hosehboliao', remarks: 'On MA', dateFrom: '11/2/2019', dateTo: '13/2/2019', numberOfDays: 2 }
  ];

  constructor() { }

  ngOnInit() { }

}
