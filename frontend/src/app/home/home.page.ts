import { Component } from '@angular/core';
import { faWpforms } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  faWpForms = faWpforms;
}
