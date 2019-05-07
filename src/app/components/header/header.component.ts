import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { store, EventsName } from '../../store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor() { }
  isSigned = false;
  isLoading = false;
  store = store;
  toggleEvent = store.toggleEvent();


status = false;

  ngOnInit() {
    this.isLoading = true;

    if (store.isReady) {
      this.onReady();
    } else {
      new Promise((resolve) => {
        store.on(EventsName.READY, resolve);
      }).then(() => {
        this.isSigned = store.isSigned;
        this.onReady();
      });
    }
  }

  onReady = () => {
    this.isLoading = false;
  }

  logOut() {
    localStorage.removeItem('token');
    location.assign('/');
}
}
