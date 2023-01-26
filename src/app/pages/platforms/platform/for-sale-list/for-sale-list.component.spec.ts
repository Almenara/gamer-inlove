import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForSaleListComponent } from './for-sale-list.component';

describe('ForSaleListComponent', () => {
  let component: ForSaleListComponent;
  let fixture: ComponentFixture<ForSaleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForSaleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForSaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
