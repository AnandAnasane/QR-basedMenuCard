import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { environment } from '../../env/environment';

declare var bootstrap: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  isVisible: boolean = true;

  userName: string = '';
  mobileNumber: string = '';
  otp: string = '';
  otpSent: boolean = false;
  showResend: boolean = false;
  countdown: number = 15;
  timerInterval: any;
  isVerified: boolean = false;

  auth = getAuth();
  cartItemsSubject: any;

  // ✅ OTP message visibility flag
  otpMessageVisible: boolean = false;

  constructor(private cartService: CartService, private router: Router) {
    initializeApp(environment.firebase);
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item.id);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item.id);
    if (this.cartItems.length === 0) {
      this.router.navigate(['/menu']);
    }
  }

  onClose() {
    this.isVisible = false;
    this.router.navigate(['/menu']);
  }

  openOtpStep() {
    const otpModal = new bootstrap.Modal(document.getElementById('otpModal'));
    otpModal.show();
  }

  sendOtp() {
    fetch('http://localhost:3000/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '+91' + this.mobileNumber })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.otpSent = true;
          this.otpMessageVisible = true; // ✅ Show OTP sent message
          this.showResend = false;
          this.startCountdown();
        }
      })
      .catch(err => {
        console.error('OTP Send Error', err);
        alert('Failed to send OTP');
      });
  }

  startCountdown() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.countdown = 15;
    this.showResend = false;

    this.timerInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.timerInterval);
        this.showResend = true;

        this.otpMessageVisible = false; // ✅ Auto-hide OTP sent message after timer
      }
    }, 1000);
  }

  resendOtp() {
    this.otpMessageVisible = false; // ✅ Hide OTP message on manual resend
    this.sendOtp(); // This will reset everything and resend OTP
  }

  verifyOtp() {
    fetch('http://localhost:3000/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '+91' + this.mobileNumber, otp: this.otp })
    })
      .then(res => res.json())
      .then(async res => {
        const auth = getAuth();
        await signInWithCustomToken(auth, res.token);
        this.isVerified = true;

        // Optional: Clear cart after placing order
        this.cartService.clearCart();

        // Show success message for 2 seconds, then redirect
        setTimeout(() => {
          this.router.navigate(['/order']);
        }, 2000);
      })
      .catch(err => {
        console.error('OTP verification failed:', err);
        alert('Invalid OTP');
      });
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cart');
  }
}
