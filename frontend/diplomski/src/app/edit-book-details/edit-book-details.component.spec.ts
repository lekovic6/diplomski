import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookDetailsComponent } from './edit-book-details.component';

describe('EditBookDetailsComponent', () => {
  let component: EditBookDetailsComponent;
  let fixture: ComponentFixture<EditBookDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBookDetailsComponent]
    });
    fixture = TestBed.createComponent(EditBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
