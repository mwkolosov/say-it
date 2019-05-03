import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-say',
  templateUrl: './create-say.component.html',
  styleUrls: ['./create-say.component.scss']
})
export class CreateSayComponent implements OnInit {
  sayMsg = '';

  constructor() { }

  ngOnInit() {
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
