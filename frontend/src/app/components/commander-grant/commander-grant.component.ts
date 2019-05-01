import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EApplicationService } from 'src/app/services/e-application.service';

@Component({
  selector: 'app-commander-grant',
  templateUrl: './commander-grant.component.html',
  styleUrls: ['./commander-grant.component.scss'],
})
export class CommanderGrantComponent implements OnInit {

  operatorConfiguration = {
    header: 'Select Commander'
  };

  customActionSheetOptions: any = {
    header: 'Number of Days'
  };

  operatorArray = [];
  operatorSelection = [];
  numberOfDays: Number;
  operatorIndex;

  constructor(public eApplicationService: EApplicationService,
    public storage: Storage, ) { }

  ngOnInit() {
    this.storage.get('userId').then(userId => {
      this.eApplicationService.retrievePersonnel({
        userId: userId,
        appointment: 'operator'
      }).subscribe(operators => {
        operators.map(operator => {
          console.log(operator)
          this.operatorSelection.push(operator.rank + ' ' + operator.firstName);
          this.operatorArray.push(operator);
        });
      });
    });
  }

  onSubmit() {
    console.log(this.operatorArray[this.operatorIndex]);
    this.eApplicationService.updateOffBalance({
      userId: this.operatorArray[this.operatorIndex]._id,
      numberOfOff: this.numberOfDays
    }).subscribe(result => {
      console.log(result);
    });
  }
}
