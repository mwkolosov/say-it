import { Component, OnInit } from '@angular/core';
import { store, EventsName } from '../../store';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogProfileComponent } from '../dialog-profile/dialog-profile.component';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  says = [];
  resays = [];
  store = store;
  user = store.user;
  constructor(public dialog: MatDialog) { }


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
    this.resays = store.getAllRetweetsOfCurrentUser();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogProfileComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



}
