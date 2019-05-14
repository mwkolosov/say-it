import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { store, EventsName } from '../../store';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss']
})
export class DashboardMenuComponent implements OnInit {
  profile = false;
  userName = '';
  userAvatar = '';
  formData = new FormData();
  userPhoto = document.querySelector('#load__user-photo') as HTMLInputElement;
  store = store;

  constructor(private router: Router) { }

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
    this.userName = store.getCurrentUserName();
    this.userAvatar = store.getCurrentUserPhoto();
    this.userPhoto = document.querySelector('#load__user-photo') as HTMLInputElement;
    console.log(this.userPhoto);
  }

  logOut() {
    localStorage.removeItem('token');
    location.assign('/');
  }

  addUserPhoto() {
    this.userPhoto = document.querySelector('#load__user-photo') as HTMLInputElement;
    this.formData.append('avatar', this.userPhoto.files[0]);
    fetch('https://say-it-twitter.herokuapp.com/api/users/uploadavatar', {
        method: 'PUT',
        headers: {
            'x-auth-token' : localStorage.getItem('token')
        },
        // tslint:disable-next-line:max-line-length
        body: this.formData
    })
    .then(async (response) => {
        if (response.status !== 200) {
            throw (await response.text());
        }
        console.log('photo', response.json);
        location.reload();
        return response.json();
    });
}

  profileRoute() {
    this.profile = (this.router.url === '/profile') ? true : false;
    return this.profile;
  }
}
