import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  email = 'misha@gmail.com';
  password = '123456';
  username = '';
  DOB = '';
  firstName = '';
  lastName = '';

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
        email: this.email,
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

  signUp() {
    this.error = '';
    fetch('https://say-it-twitter.herokuapp.com/api/users/new', {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        userName: this.username,
        email: this.email,
        password: this.password,
        DOB: this.DOB,
        firstName: this.firstName,
        lastName: this.lastName
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
      location.reload();
    })
    .catch((error) => {
      this.error = error;
    });
}
}
