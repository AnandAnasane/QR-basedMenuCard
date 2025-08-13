
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  veg: any;
  type: any;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartNotEmptySubject = new BehaviorSubject<boolean>(false);
  cartNotEmpty$ = this.cartNotEmptySubject.asObservable(); 

  private cartVisibleSubject = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.cartVisibleSubject.asObservable();

  constructor() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart);
      this.cartItemsSubject.next(parsedCart);
      this.updateCartState();
    }

    // Restore cart modal visibility state
    const savedVisibility = localStorage.getItem('cartModelVisible');
    if (savedVisibility === '1' && this.cartItemsSubject.getValue().length > 0) {
      this.cartVisibleSubject.next(true);
    }
  }

  getCart(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  getTotal(): number {
    return this.cartItemsSubject
      .getValue()
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  setCartModalVisible(value: boolean) {
    this.cartVisibleSubject.next(value);
    localStorage.setItem('cartModelVisible', value ? '1' : '0');
  }

  getCurrentVisibility(): boolean {
    return localStorage.getItem('cartModelVisible') === '1';
  }

  addToCart(item: CartItem) {
    const currentItems = this.cartItemsSubject.getValue();
    const existingItem = currentItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ ...item, quantity: 1 });
    }
    this.cartItemsSubject.next(currentItems);
    this.saveCart();
    this.updateCartState();
    this.setCartModalVisible(true); // show modal when item added
  }

  increaseQty(itemId: string) {
    const currentItems = this.cartItemsSubject.getValue();
    const item = currentItems.find(i => i.id === itemId);
    if (item) item.quantity += 1;
    this.cartItemsSubject.next(currentItems);
    this.saveCart();
    this.updateCartState(); 
  }

  decreaseQty(itemId: string) {
    const currentItems = this.cartItemsSubject.getValue();
    const item = currentItems.find(i => i.id === itemId);
    if (item) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        this.removeItem(itemId);
        return;
      }
    }
    this.cartItemsSubject.next(currentItems);
    this.saveCart();
    this.updateCartState();
  }

  removeItem(itemId: string) {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.cartItemsSubject.next(updatedItems);
    this.saveCart();
    this.updateCartState();
  }

  getItemQuantity(itemId: string): number {
    const currentItems = this.cartItemsSubject.getValue();
    const item = currentItems.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    this.saveCart();
    this.updateCartState();
    this.setCartModalVisible(false);
  }

  private updateCartState() {
    const currentItems = this.cartItemsSubject.getValue();
    this.cartNotEmptySubject.next(currentItems.length > 0);
  }

  private saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemsSubject.getValue()));
  }
}