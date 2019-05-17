import { Component, OnInit } from '@angular/core';
import { store, EventsName } from '../../store';


@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.sass']
})
export class UserFeedComponent implements OnInit {
  says = [];
  resays = [];
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
    this.resays = store.getAllRetweetsOfCurrentUser();
  }

}
