import { Component, OnInit, Input } from '@angular/core';
import { store } from '../../store';

@Component({
  selector: 'app-say',
  templateUrl: './say.component.html',
  styleUrls: ['./say.component.scss']
})
export class SayComponent implements OnInit {
  store = store;
  img = false;
  @Input() say: any;

  constructor() { }

  ngOnInit() {
  }

  imgCheck() {
    const img = (this.say.images === undefined) ? false : true;
    return img;
  }
}
