import { Component, OnInit } from '@angular/core';
import { store, EventsName } from '../../store';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  says = [];
  store = store;
  constructor() { }


  ngOnInit() {
    if (store.isReady) {
      this.onReady();
    } else {
      new Promise((resolve) => {
        store.on(EventsName.READY, resolve);
      }).then(this.onReady);
    }

    store.on(EventsName.TWEETS_UPDATED, this.onReady);
  }

  onReady = () => {
    this.says = store.getAllTweetsOfCurrentUser();
    console.log('1234567', store.activeUser);
  }



}
