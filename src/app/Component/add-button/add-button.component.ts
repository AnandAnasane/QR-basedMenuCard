import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [CommonModule,RouterModule , RouterLink],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css'
})
export class AddButtonComponent {
  quantity = 0;
  showGoToCartButton = false;

  constructor() {}

  addItem() {
    this.quantity = 1;
    this.showGoToCartButton = true;
  }

  increaseQty() {
    this.quantity++;
    this.showGoToCartButton = true;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    } else {
      this.quantity = 0;
      this.showGoToCartButton = false;
    }
  }

  // goToCart() {
   
  //   this.router.navigate(['/cart']);
  // }
}
