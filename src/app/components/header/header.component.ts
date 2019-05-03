import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { store, EventsName } from '../../store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSigned = false;

  constructor() { }

  ngOnInit() {
    new Promise((resolve) => {
      store.on(EventsName.READY, resolve);
    }).then(() => {
      this.isSigned = store.isSigned;
    });
  }

  logOut() {
    localStorage.removeItem('token');
    location.reload();
  }

}
