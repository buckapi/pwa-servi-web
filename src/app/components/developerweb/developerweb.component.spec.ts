import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperwebComponent } from './developerweb.component';

describe('DeveloperwebComponent', () => {
  let component: DeveloperwebComponent;
  let fixture: ComponentFixture<DeveloperwebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperwebComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
