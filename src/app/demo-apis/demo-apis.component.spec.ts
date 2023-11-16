import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoApisComponent } from './demo-apis.component';

describe('DemoApisComponent', () => {
  let component: DemoApisComponent;
  let fixture: ComponentFixture<DemoApisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoApisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
