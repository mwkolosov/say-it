import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSayComponent } from './create-say.component';

describe('CreateSayComponent', () => {
  let component: CreateSayComponent;
  let fixture: ComponentFixture<CreateSayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
