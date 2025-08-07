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
  imports: [CommonModule, FormsModule, RouterLink],
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

  otpMessageVisible: boolean = false;
  otpErrorMessage: string = ''; // ✅ For red error message

  auth = getAuth();
  cartItemsSubject: any;

  nameError: string = '';
  mobileError: string = '';


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
    // Reset error messages
    this.nameError = '';
    this.mobileError = '';

    // Validate name
    if (!this.userName || this.userName.trim().length < 2) {
      this.nameError = 'Please enter a valid name (at least 2 characters).';
    }

    // Validate mobile number
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(this.mobileNumber)) {
      this.mobileError = 'Enter a valid 10-digit Valid number.';
    }

    // Stop if any error
    if (this.nameError || this.mobileError) {
      return;
    }

    // Proceed to send OTP
    fetch('http://localhost:3000/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '+91' + this.mobileNumber })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.otpSent = true;
          this.otpMessageVisible = true;
          this.otpErrorMessage = '';
          this.showResend = false;
          this.startCountdown();
        }
      })
      .catch(err => {
        console.error('OTP Send Error', err);
        this.otpErrorMessage = 'Failed to send OTP. Please try again.';
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
        this.otpMessageVisible = false;
      }
    }, 1000);
  }

  resendOtp() {
    this.otpMessageVisible = false;
    this.otpErrorMessage = ''; // ✅ Clear error on resend
    this.sendOtp();
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
        this.otpErrorMessage = ''; // ✅ Clear any old error

        this.cartService.clearCart();

        setTimeout(() => {
          this.router.navigate(['/order']);
        }, 2000);
      })
      .catch(err => {
        console.error('OTP verification failed:', err);
        this.otpErrorMessage = 'Invalid OTP. Please try again.'; // ✅ Set red error message
      });
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cart');
  }
}
