import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySearchPageComponent } from './category-search-page.component';

describe('CategorySearchPageComponent', () => {
  let component: CategorySearchPageComponent;
  let fixture: ComponentFixture<CategorySearchPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorySearchPageComponent]
    });
    fixture = TestBed.createComponent(CategorySearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
