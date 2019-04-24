import { Component, OnInit } from '@angular/core';
import { faUserFriends, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-commander-e-application',
  templateUrl: './commander-e-application.page.html',
  styleUrls: ['./commander-e-application.page.scss'],
})
export class CommanderEApplicationPage implements OnInit {

  faUserFriends = faUserFriends;
  faEdit = faEdit;
  segment = 'approval';

  constructor() { }

  ngOnInit() {
  }

}
