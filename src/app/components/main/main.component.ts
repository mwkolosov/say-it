import { Component, OnInit } from '@angular/core';
import { store, EventsName } from '../../store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isLoading = false;
  isSigned = false;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;

    if (store.isReady) {
      this.onReady();
    } else {
      new Promise((resolve) => {
        store.on(EventsName.READY, resolve);
      }).then(this.onReady);
    }
  }

  onReady = () => {
    this.isSigned = store.isSigned;
    this.isLoading = false;
  }
}
