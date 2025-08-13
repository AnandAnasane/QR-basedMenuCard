import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/Supabase/supabase.service';

declare var bootstrap: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})


export class CartComponent implements OnInit, AfterViewInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  isVisible: boolean = true;

  // OTP related state
  otpSent: boolean = false;
  countdown: number = 0;
  timer: any;

  // Customer info fields
  customerName: string = '';
  customerMobile: string = '';

  // OTP input binding
  enteredOtp: string = '';

  // Alert messages
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });

    if (this.cartService.getCurrentVisibility() && this.cartService.getCart().length > 0) {
      this.showCartModal();
    }
  }

  ngAfterViewInit() {
    // ✅ Auto OTP detection on mobile browsers (Web OTP API)
    if ('OTPCredential' in window) {
      // @ts-ignore
      navigator.credentials.get({ otp: { transport: ['sms'] }, signal: new AbortController().signal })
        .then((otp: any) => {
          if (otp && otp.code) {
            this.enteredOtp = otp.code;
            this.verifyOtp(); // Auto-verify
          }
        })
        .catch(err => console.log('OTP Auto-fetch error:', err));
    }
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
    this.cartService.setCartModalVisible(false);
    this.router.navigate(['/menu']);
  }

  showCartModal() {
    const cartModalEl = document.getElementById('cartModal');
    if (cartModalEl) {
      const cartModal = new bootstrap.Modal(cartModalEl);
      cartModal.show();
    }
  }

  closeOrderModal() {
    const modalElement = document.getElementById('orderModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
    this.otpSent = false;
    clearInterval(this.timer);
  }

  placeOrder() {
    const firstModal = new bootstrap.Modal(document.getElementById('firstModal'));
    firstModal.show();
  }

  async sendOtp() {
    // Validate before sending
    if (!this.customerName || this.customerName.trim().length < 3 ||
        !/^[0-9]{10}$/.test(this.customerMobile)) {
      return;
    }

    const { error } = await this.supabaseService.sendOtp('+91' + this.customerMobile);
    if (error) {
      this.errorMessage = 'Error sending OTP: ' + error.message;
      this.successMessage = '';
      return;
    }

    // Close first modal and show OTP modal
    const firstModalEl = document.getElementById('firstModal');
    const firstModalInstance = bootstrap.Modal.getInstance(firstModalEl);
    if (firstModalInstance) firstModalInstance.hide();

    this.otpSent = true;
    this.startCountdown();
    const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
    orderModal.show();
  }

  async verifyOtp() {
  if (!this.enteredOtp) return;

  const { error } = await this.supabaseService.verifyOtp('+91' + this.customerMobile, this.enteredOtp);
  if (error) {
    this.errorMessage = 'Invalid OTP. Please try again.';
    this.successMessage = '';

    // Show error modal
    const errorModalEl = document.getElementById('errorModal');
    if (errorModalEl) {
      const errorModal = new bootstrap.Modal(errorModalEl);
      errorModal.show();
    }

    return;
  }

  // OTP Verified - clear cart
  this.cartService.clearCart();
  this.successMessage = '';
  this.errorMessage = '';

  // Close OTP modal
  this.closeOrderModal();

  // Show success modal
  const successModalEl = document.getElementById('successModal');
  if (successModalEl) {
    const successModal = new bootstrap.Modal(successModalEl);
    successModal.show();
  }

  // Redirect after delay
  setTimeout(() => {
    const successModalInstance = bootstrap.Modal.getInstance(successModalEl);
    if (successModalInstance) successModalInstance.hide();
    this.router.navigate(['/order']);
  }, 2000);
}



  startCountdown() {
    this.countdown = 20;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  resendOtp(event: Event) {
    event.preventDefault();
    this.sendOtp();
  }
}
