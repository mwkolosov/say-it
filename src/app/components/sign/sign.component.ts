import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  username = 'misha@gmail.com';
  password = '123456';
  error = '';

  constructor() { }

  ngOnInit() {
  }

  signIn() {

    this.error = '';
    fetch('https://say-it-twitter.herokuapp.com/api/auth', {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        email: this.username,
        password: this.password
      })
    })
    .then(async (response) => {
      if (response.status !== 200) {
        throw (await response.text());
      }
      return response.json();
    })
    .then((msg) => {
      console.log(msg);
      localStorage.setItem('token', msg.token);
      location.reload();
    })
    .catch((error) => {
      this.error = error;
    });
  }
}
