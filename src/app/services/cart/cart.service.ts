import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



export interface CartItem {
  id: string;    // unique id (item name or backend id)
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

  addToCart(item: CartItem) {
    const currentItems = this.cartItemsSubject.getValue();
    const existingItem = currentItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ ...item, quantity: 1 });
    }
    this.cartItemsSubject.next(currentItems);
  }

  increaseQty(itemId: string) {
    const currentItems = this.cartItemsSubject.getValue();
    const item = currentItems.find(i => i.id === itemId);
    if (item) item.quantity += 1;
    this.cartItemsSubject.next(currentItems);
  }

  decreaseQty(itemId: string) {
    const currentItems = this.cartItemsSubject.getValue();
    const item = currentItems.find(i => i.id === itemId);
    if (item) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        this.removeItem(itemId);
      }
    }
    this.cartItemsSubject.next(currentItems);
  }

  getItemQuantity(itemId: string): number {
    const currentItems = this.cartItemsSubject.getValue();
    const item = currentItems.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  }

  removeItem(itemId: string) {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.cartItemsSubject.next(updatedItems);
  }
}
