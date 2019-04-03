import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  username = '';
  password = '';

  constructor() { }

  ngOnInit() {
  }

  signIn() {
    console.log(this.username, this.password);
    const promise = (fetch('https://say-it-twitter.herokuapp.com/api/auth', {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        email: 'misha@gmail.com',
        password: '123456'
      })
    }))
    .then(function(response) {
      alert(response.headers.get('Content-Type'));
      alert(response.status);

      return response.json();
    })
    .catch(alert);
  }

}
