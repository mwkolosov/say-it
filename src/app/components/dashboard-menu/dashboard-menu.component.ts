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
  }

  logOut() {
    localStorage.removeItem('token');
    location.reload();
  }

  profileRoute() {
    this.profile = (this.router.url === '/profile') ? true : false;
    return this.profile;
  }
}
