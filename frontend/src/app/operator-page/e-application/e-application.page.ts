import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EApplicationService } from 'src/app/services/e-application.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-e-application',
  templateUrl: './e-application.page.html',
  styleUrls: ['./e-application.page.scss'],
})
export class EApplicationPage implements OnInit {

  startDate: String = new Date().toISOString();
  endDate: String = new Date().toISOString();


  approvingCommanderOptions = {
    header: 'Select Commander'
  };

  customActionSheetOptions: any = {
    header: 'Number of Days'
  };

  offBalance;
  commandersArray = [];


  constructor(public storage: Storage,
    public eApplicationService: EApplicationService) {

  }

  ngOnInit() {
    this.storage.get('userId').then(userId => {
      this.eApplicationService.retrievePersonnel({
        userId: userId,
        appointment: 'commander'
      }).subscribe(commanders => {
        commanders.map(commander => {
          this.commandersArray.push(commander.firstName);
        });
      });

      this.eApplicationService.retrieveOffBalance(userId).subscribe(balance => {
        console.log(balance);
        if (balance.offBalance) {
          this.offBalance = balance.offBalance;
        }
        else {
          this.offBalance = 0;
        }
      });
    });
  }
}
