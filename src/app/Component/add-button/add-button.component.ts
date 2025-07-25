import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css'
})
export class AddButtonComponent {

  @Input() itemId!: string;
  @Input() itemName!: string;
  @Input() itemPrice!: number;
  @Input() itemImage!: string;

  quantity = 0;
  showGoToCartButton = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.quantity = this.cartService.getItemQuantity(this.itemId);
    this.showGoToCartButton = this.quantity > 0;
  }

  addItem() {
    this.cartService.addToCart({
      id: this.itemId,
      name: this.itemName,
      price: Number(this.itemPrice),
      image: this.itemImage,
      quantity: 1
    });
    this.quantity = this.cartService.getItemQuantity(this.itemId);
    this.showGoToCartButton = true;
  }

  increaseQty() {
    this.cartService.increaseQty(this.itemId);
    this.quantity = this.cartService.getItemQuantity(this.itemId);
    this.showGoToCartButton = true;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.cartService.decreaseQty(this.itemId);
      this.quantity = this.cartService.getItemQuantity(this.itemId);
    } else {
      this.cartService.removeItem(this.itemId);
      this.quantity = 0;
      this.showGoToCartButton = false;
    }
  }

}



  // quantity = 0;
 

  // constructor() {}

  // addItem() {
  //   this.quantity = 1;
  //   this.showGoToCartButton = true;
  // }

  // increaseQty() {
  //   this.quantity++;
  //   this.showGoToCartButton = true;
  // }

  // decreaseQty() {
  //   if (this.quantity > 1) {
  //     this.quantity--;
  //   } else {
  //     this.quantity = 0;
  //     this.showGoToCartButton = false;
  //   }
  // }



