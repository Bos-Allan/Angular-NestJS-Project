import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupmovieComponent } from './popupmovie.component';

describe('PopupmovieComponent', () => {
  let component: PopupmovieComponent;
  let fixture: ComponentFixture<PopupmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupmovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
