import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPageModules } from './details.modules';

describe('DetailsPage', () => {
  let component: DetailsPageModules;
  let fixture: ComponentFixture<DetailsPageModules>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPageModules);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
