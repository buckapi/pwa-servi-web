import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomineComponent } from './domine.component';

describe('DomineComponent', () => {
  let component: DomineComponent;
  let fixture: ComponentFixture<DomineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
