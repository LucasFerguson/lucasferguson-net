import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreejsBackgroundComponent } from './threejs-background.component';

describe('ThreejsBackgroundComponent', () => {
  let component: ThreejsBackgroundComponent;
  let fixture: ComponentFixture<ThreejsBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreejsBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreejsBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
