import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroJimComponent } from './registro-jim.component';

describe('RegistroJimComponent', () => {
  let component: RegistroJimComponent;
  let fixture: ComponentFixture<RegistroJimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroJimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroJimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
