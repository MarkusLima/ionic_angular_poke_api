import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageModules } from './home.modules';

describe('HomePage', () => {
  let component: HomePageModules;
  let fixture: ComponentFixture<HomePageModules>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageModules);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
