import { Component, OnInit } from '@angular/core';
import { faEdit, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faWpforms } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commander-home',
  templateUrl: './commander-home.component.html',
  styleUrls: ['./commander-home.component.scss'],
})
export class CommanderHomeComponent implements OnInit {

  faEdit = faEdit;
  faWpForms = faWpforms;
  faUtensils = faUtensils;

  constructor(public router: Router) { }

  ngOnInit() { }

  eApplication() {
    this.router.navigateByUrl('/commander-e-application');
  }

  eParadeState() {
    this.router.navigateByUrl('/e-parade-state');
  }

  eRation() {
    this.router.navigateByUrl('/e-ration');
  }

}
