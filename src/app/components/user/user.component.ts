import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { store, EventsName } from '../../store';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public isLoading = false;
  public userId: string;
  public user: any;
  store = store;
  says = [];
  resays = [];
  getUserName = '';
  getUserLogin = '';
  userAvatar = '/';
  getNumberOfSays = 0;
  getNumberOfFollows = 0;
  getNumberOfFollowers = 0;

  constructor(
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    // Subscribed
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });

    if (store.isReady) {
      this.onReady(store.says);
    } else {
      new Promise((resolve) => {
        store.on(EventsName.TWEETS_LOAD, resolve);
      }).then(this.onReady);
    }

    store.on(EventsName.TWEETS_UPDATED, this.onReady);
  }

  onReady = (users: any[]) => {
    const singleUser = store.users.filter((user) => user._id === this.userId)[0];
    this.getUserSays(this.userId);
    this.getUserResays(this.userId);
    this.getUserName = store.getUserName(this.userId);
    this.getUserLogin = store.getUserLogin(this.userId);
    this.getNumberOfSays = store.getNumberOfSays(this.userId);
    this.getNumberOfFollows = store.getNumberOfFollows(this.userId);
    this.getNumberOfFollowers = store.getNumberOfFollowers(this.userId);
    this.userAvatar = store.getUserPhoto(this.userId);

    if (singleUser) {
      this.userId = singleUser;
      this.isLoading = false;
    } else {
      location.href = '/';
    }
  }

  getUserSays(userId) {
    fetch('https://say-it-twitter.herokuapp.com/api/tweets/all/' + userId, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(async (response) => {
        if (response.status !== 200) {
          throw (await response.text());
        }
        return response.json();
      })
      .then((msg) => {
        msg.forEach((say) => this.says.push(store.translateSay(say)));
      });
  }

  getUserResays(userId) {
    fetch('https://say-it-twitter.herokuapp.com/api/retweets/all/' + userId, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(async (response) => {
        if (response.status !== 200) {
          throw (await response.text());
        }
        return response.json();
      })
      .then((msg) => {
        if (msg === {}) {
          return;
        }
        msg.retweets.forEach((resay) => this.resays.push(store.translateResay(resay)));
      });
  }
}
