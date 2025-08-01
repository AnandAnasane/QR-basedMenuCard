import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from '../heading/heading.component';
import { CartItem, CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, HeadingComponent, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item.id);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item.id);
  }



  //  For OTP Section 

   mobileNumber = '';
  otp = '';
  otpSent = false;
  correctOtp = '';



  openOtpStep() {
    const otpModal = new bootstrap.Modal(document.getElementById('otpModal'));
    otpModal.show();
  }

  sendOtp() {
    // Simulate OTP send
    this.correctOtp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpSent = true;

    // Simulate API call (send this.correctOtp to user's mobile via backend)
    console.log('Sending OTP:', this.correctOtp, 'to', this.mobileNumber);
    alert(`Mock OTP sent: ${this.correctOtp}`);
  }

  verifyOtp() {
    if (this.otp === this.correctOtp) {
      alert('OTP verified successfully!');
    
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  }
}
