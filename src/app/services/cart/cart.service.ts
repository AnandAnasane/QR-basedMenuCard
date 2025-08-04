
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
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

   setCartModalVisible(value: boolean) {
    this.cartVisibleSubject.next(value);
    localStorage.setItem('cartModelVisible', value ? '1' : '0')
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
    this.updateCartState(); 
  }

  increaseQty(itemId: string) {
    const currentItems = this.cartItemsSubject.getValue();
    const item = currentItems.find(i => i.id === itemId);
    if (item) item.quantity += 1;
    this.cartItemsSubject.next(currentItems);
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
    this.updateCartState();
  }

  removeItem(itemId: string) {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.cartItemsSubject.next(updatedItems);
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

   clearCart(){
    this.cartItemsSubject.next([]);
    this.updateCartState();
  }

  private updateCartState() {
    const currentItems = this.cartItemsSubject.getValue();
    this.cartNotEmptySubject.next(currentItems.length > 0);
  }

 
}

