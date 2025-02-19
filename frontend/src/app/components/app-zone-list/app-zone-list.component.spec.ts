import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppZoneListComponent } from './app-zone-list.component';

describe('AppZoneListComponent', () => {
  let component: AppZoneListComponent;
  let fixture: ComponentFixture<AppZoneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppZoneListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppZoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
