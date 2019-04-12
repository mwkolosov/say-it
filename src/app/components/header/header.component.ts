import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MainService} from '../../services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSigned = false;

  constructor() { }

  ngOnInit() {
    MainService.checkIsAuth().then((flag: any) => {
      this.isSigned = flag;
    });
  }

  logOut() {
    localStorage.removeItem('token');
    location.reload();
  }

}
