import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartShoppingComponent } from './cart-shopping.component';

describe('CartShoppingComponent', () => {
  let component: CartShoppingComponent;
  let fixture: ComponentFixture<CartShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartShoppingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
