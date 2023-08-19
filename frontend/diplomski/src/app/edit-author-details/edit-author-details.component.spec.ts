import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuthorDetailsComponent } from './edit-author-details.component';

describe('EditAuthorDetailsComponent', () => {
  let component: EditAuthorDetailsComponent;
  let fixture: ComponentFixture<EditAuthorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAuthorDetailsComponent]
    });
    fixture = TestBed.createComponent(EditAuthorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
