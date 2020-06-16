import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsListGridComponent } from './channels-list-grid.component';

describe('ChannelsListGridComponent', () => {
  let component: ChannelsListGridComponent;
  let fixture: ComponentFixture<ChannelsListGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelsListGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
