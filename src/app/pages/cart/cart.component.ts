import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';
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

  confirmationResult!: ConfirmationResult;
  auth = getAuth();
  recaptchaVerifier!: RecaptchaVerifier;

  constructor(private cartService: CartService, private router: Router) {
    initializeApp(environment.firebase);
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });

    this.renderRecaptcha();
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

  renderRecaptcha() {
    this.recaptchaVerifier = new RecaptchaVerifier(
      this.auth,
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response: any) => {
          this.sendOtp(); // Automatically called if reCAPTCHA passes
        }
      }
    );

    // Attach to window so Firebase can access it internally
    (window as any).recaptchaVerifier = this.recaptchaVerifier;

    this.recaptchaVerifier.render().then((widgetId: any) => {
      console.log('reCAPTCHA rendered with widget ID:', widgetId);
    });
  }

  sendOtp() {
    const fullPhoneNumber = '+91' + this.mobileNumber;

    signInWithPhoneNumber(this.auth, fullPhoneNumber, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        this.otpSent = true;
        this.showResend = false;
        this.countdown = 15;
        this.startCountdown();
      })
      .catch((error) => {
        console.error('Error during signInWithPhoneNumber:', error);
        alert('Failed to send OTP. Please check your number or try again.');
      });
  }

  startCountdown() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.timerInterval);
        this.showResend = true;
      }
    }, 1000);
  }

  resendOtp() {
    this.sendOtp();
  }

  verifyOtp() {
    this.confirmationResult.confirm(this.otp)
      .then((result) => {
        this.isVerified = true;
        clearInterval(this.timerInterval);
        alert('OTP verified successfully!');
      })
      .catch((error) => {
        console.error('OTP verification failed:', error);
        alert('Invalid OTP. Please try again.');
      });
  }
}
