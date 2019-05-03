import { Component, OnInit, Input } from '@angular/core';
import { store } from '../../store';

@Component({
  selector: 'app-say',
  templateUrl: './say.component.html',
  styleUrls: ['./say.component.scss']
})
export class SayComponent implements OnInit {
  store = store;
  @Input() say: any;

  constructor() { }

  ngOnInit() {
    console.log( 'lol 3', this.say);
  }
}
