import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css'
})
export class AddButtonComponent implements OnInit, OnDestroy {

  @Input() itemId!: string;
  @Input() itemName!: string;
  @Input() itemPrice!: number;
  @Input() itemImage!: string;

  @Output() itemAddedToCart = new EventEmitter<void>();

  quantity = 0;
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.quantity = this.cartService.getItemQuantity(this.itemId);

    // ✅ Subscribe to cart changes
    this.cartSubscription = this.cartService.cartItems$.subscribe(() => {
      this.quantity = this.cartService.getItemQuantity(this.itemId);
    });
  }

  addItem() {
    this.cartService.addToCart({
      id: this.itemId,
      name: this.itemName,
      price: Number(this.itemPrice),
      image: this.itemImage,
      quantity: 1,
      type: undefined
    });
    this.itemAddedToCart.emit();
  }

  increaseQty() {
    this.cartService.increaseQty(this.itemId);
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.cartService.decreaseQty(this.itemId);
    } else {
      this.cartService.removeItem(this.itemId);
    }
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) this.cartSubscription.unsubscribe();
  }
}
