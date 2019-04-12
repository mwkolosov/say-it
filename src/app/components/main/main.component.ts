import { Component, OnInit } from '@angular/core';
import { MainService} from '../../services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isLoading = false;
  isSigned = false;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
    MainService.checkIsAuth().then((flag: any) => {
      this.isLoading = false;
      this.isSigned = flag;
    });
  }

}
