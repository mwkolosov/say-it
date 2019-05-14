import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { store, EventsName } from '../../store';

@Component({
  selector: 'app-create-say',
  templateUrl: './create-say.component.html',
  styleUrls: ['./create-say.component.scss']
})
export class CreateSayComponent implements OnInit {
  sayMsg = '';
  formData = new FormData();
  sayPhoto = document.querySelector('#load__tweet-photo') as HTMLInputElement;


  constructor() { }

  ngOnInit() {
    if (store.isReady) {
      this.onReady();
    } else {
      new Promise((resolve) => {
        store.on(EventsName.READY, resolve);
      }).then(this.onReady);
    }
  }

  onReady = () => {
    this.sayPhoto = document.querySelector('#load__tweet-photo') as HTMLInputElement;
    console.log('parampam', this.sayPhoto);
  }

  sayItForm() {
    fetch('https://say-it-twitter.herokuapp.com/api/tweets/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        tweetText: this.sayMsg
      })
    })

      .then(async (response) => {
        const msg = await response.text();
        const msgObj = JSON.parse(msg);
        console.log(msgObj._id);
        this.formData.append('tweetimages', this.sayPhoto.files[0]);
        fetch('https://say-it-twitter.herokuapp.com/api/tweets/uploadimages/' + msgObj._id, {
          method: 'PUT',
          headers: {
            'x-auth-token': localStorage.getItem('token')
          },
          // tslint:disable-next-line:max-line-length
          body: this.formData
        })
          .then(async (responses) => {
            if (responses.status !== 200) {
              throw (await responses.text());
            }
            console.log('photo', response.json);
            location.reload();
            return responses.json();
          });
      });
  }
}
