import { Component, OnInit } from '@angular/core';
import { faWpforms } from '@fortawesome/free-brands-svg-icons';
import { faEdit, faUtensils, faBook } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operator-home',
  templateUrl: './operator-home.component.html',
  styleUrls: ['./operator-home.component.scss'],
})
export class OperatorHomeComponent implements OnInit {
  faWpForms = faWpforms;
  faEdit = faEdit;
  faUtensils = faUtensils;
  faBook = faBook;

  constructor(public router: Router) { }

  ngOnInit() { }

  eBIBO() {
    this.router.navigateByUrl('/ebibo');
  }

}
