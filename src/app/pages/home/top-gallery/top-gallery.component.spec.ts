import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopGalleryComponent } from './top-gallery.component';

describe('TopGalleryComponent', () => {
  let component: TopGalleryComponent;
  let fixture: ComponentFixture<TopGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
