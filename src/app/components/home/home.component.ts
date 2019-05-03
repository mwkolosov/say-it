import { Component, OnInit } from '@angular/core';
import { store, EventsName } from '../../store';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  says = [];
  sayMsg = '';
  addUserPhoto = store.addUserPhoto();

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
  }

  sayItForm() {
    fetch('https://say-it-twitter.herokuapp.com/api/tweets/create', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json',
        'x-auth-token' : localStorage.getItem('token')
      },
      body: JSON.stringify({
        tweetText: this.sayMsg
      })
    })
    .then(async (response) => {
      const msg = await response.text();
      console.log(msg);
      // says.push(msg);
    });
  }



}
