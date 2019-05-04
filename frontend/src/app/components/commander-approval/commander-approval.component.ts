import { Component, OnInit } from '@angular/core';
import { EApplicationService } from 'src/app/services/e-application.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-commander-approval',
  templateUrl: './commander-approval.component.html',
  styleUrls: ['./commander-approval.component.scss'],
})
export class CommanderApprovalComponent implements OnInit {

  personnelArray = [];
  userId;

  constructor(public eApplicationService: EApplicationService,
    public storage: Storage) { }

  ngOnInit() {
    this.storage.get('userId').then(userId => {
      this.userId = userId;
      this.eApplicationService.retrievePendingOff({
        userId: userId
      }).subscribe(result => {
        console.log(result)
        this.personnelArray = result;
      })
    })
  }

  approve(index) {
    this.eApplicationService.approveOff({
      userId: this.userId,
      document: this.personnelArray[index]
    }).subscribe(result => {
      console.log(result)
    })
  }

}
