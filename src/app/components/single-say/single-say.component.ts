import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { store, EventsName } from '../../store';

@Component({
  selector: 'app-single-say',
  templateUrl: './single-say.component.html',
  styleUrls: ['./single-say.component.scss']
})
export class SingleSayComponent implements OnInit {
  public isLoading = false;
  public sayId: string;
  public say: any;

  constructor(
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.sayId = this.route.snapshot.paramMap.get('id');

    // Subscribed
    this.route.paramMap.subscribe(params => {
      this.sayId = params.get('id');
    });

    if (store.isReady) {
      this.onReady(store.says);
    } else {
      new Promise((resolve) => {
        store.on(EventsName.TWEETS_LOAD, resolve);
      }).then(this.onReady);
    }

    store.on(EventsName.TWEETS_UPDATED, this.onReady);
  }

  onReady = (says: any[]) => {
    const singleSay = store.translateSay(
      (says || []).filter((say) => say._id === this.sayId)[0]
    );

    if (singleSay) {
      this.say = singleSay;
      this.isLoading = false;
    } else {
      location.href = '/';
    }
  }
}
