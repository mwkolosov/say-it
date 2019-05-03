import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSayComponent } from './single-say.component';

describe('SingleSayComponent', () => {
  let component: SingleSayComponent;
  let fixture: ComponentFixture<SingleSayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
