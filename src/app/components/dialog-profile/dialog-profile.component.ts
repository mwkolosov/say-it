import { Component, OnInit } from '@angular/core';
import { store, EventsName } from '../../store';


@Component({
  selector: 'app-dialog-profile',
  templateUrl: './dialog-profile.component.html',
  styleUrls: ['./dialog-profile.component.scss']
})

export class DialogProfileComponent implements OnInit {
  store = store;
  pass = '';
  error = '';
  userName = store.getCurrentUserName();
  lastName = store.getCurrentLastName();
  firstName = store.getCurrentFirstName();

  constructor() { }

  ngOnInit() {
  }

  updateUserInfo() {
    fetch('https://say-it-twitter.herokuapp.com/api/users/updateme', {
      method: 'PATCH',
      // mode: 'no-cors',
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        userName: this.userName,
        password: this.pass,
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
      .catch((error) => {
        this.error = error;
      });
  }

}
