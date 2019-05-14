import { Component, OnInit, Input } from '@angular/core';
import { store } from '../../store';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-say',
  templateUrl: './say.component.html',
  styleUrls: ['./say.component.scss']
})
export class SayComponent implements OnInit {
  store = store;
  img = false;
  permission = false;
  resay = false;
  resayCounter = 0;
  @Input() say: any;

  constructor() { }

  ngOnInit() {
  }

  imgCheck() {
    const img = (this.say.images === undefined) ? false : true;
    return img;
  }

  deletePermission() {
    const token = localStorage.getItem('token');
    const user = token ? MainService.parseJwt(token) : '';
    let permission = false;
    if (this.say.authorId === user._id) {
      permission = true;
    }
    return permission;
  }

  getResayCounter() {
    const resayCounter = this.say.resayCount;
    return resayCounter;

  }
}
