import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartModelComponent } from './cart-model.component';

describe('CartModelComponent', () => {
  let component: CartModelComponent;
  let fixture: ComponentFixture<CartModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
