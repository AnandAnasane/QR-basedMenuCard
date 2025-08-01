import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-model',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-model.component.html',
  styleUrl: './cart-model.component.css'
})
export class CartModelComponent {

  @Input() cartCount: number = 0;
  isVisible = false;
  showConfirmation = false;

  constructor(private router: Router, private cartservice: CartService) {}

  showModal(count: number) {
    this.cartCount = count;
    if (count > 0) this.isVisible = true;
  }

  triggerCloseModal() {
    this.showConfirmation = true;
  }

  confirmRemoveItems() {
    this.cartservice.clearCart();
    this.cartCount = 0;
    this.isVisible = false;
    this.showConfirmation = false;
  }

  cancelRemoveItems() {
    this.showConfirmation = false;
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }
}
