import { Component, OnInit, ViewChild } from '@angular/core';
import { BottomNavbarComponent } from '../bottom-navbar/bottom-navbar.component';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { HeadingComponent } from '../heading/heading.component';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from '../../Component/add-button/add-button.component';
import { CartModelComponent } from '../../Component/cart-model/cart-model.component';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [HeadingComponent, TopNavbarComponent, BottomNavbarComponent, AddButtonComponent, CommonModule, CartModelComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit  {

  isVisible = false;
  cartCount = 0;


  // imageUrl = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png';

  menuData = [
    {
      name: 'Turkish Food',
      items: [
        { name: 'Tofu in Thai Peanut Sauce', price: 299, image: 'https://images.unsplash.com/photo-1581921897705-d1b23d0f9e14' },
        { name: 'Chicken Doner', price: 399, image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb47' },
        { name: 'Lamb Kebab', price: 499, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90' },
        { name: 'Falafel Wrap', price: 199, image: 'https://images.unsplash.com/photo-1597865632338-dc2c34b94314' },
      ]
    },
    {
      name: 'Soup',
      items: [
        { name: 'Tomato Soup', price: 149, image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba' },
        { name: 'Sweet Corn Soup', price: 169, image: 'https://images.unsplash.com/photo-1604908177521-a5f9d5f1d0d4' },
        { name: 'Manchow Soup', price: 179, image: 'https://images.unsplash.com/photo-1617191515733-7f2f3f943c0d' },
        { name: 'Hot and Sour Soup', price: 189, image: 'https://images.unsplash.com/photo-1538384768288-7af4e5dede14' },
      ]
    },
    {
      name: 'Sushi',
      items: [
        { name: 'Salmon Sushi', price: 499, image: 'https://images.unsplash.com/photo-1562158071-9d3e0f1a587a' },
        { name: 'Tuna Sushi', price: 549, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754' },
        { name: 'Prawn Sushi', price: 599, image: 'https://images.unsplash.com/photo-1553621042-5b8f4b273b8e' },
        { name: 'Veg Sushi Roll', price: 299, image: 'https://images.unsplash.com/photo-1570968915860-2ca55f0b4867' },
      ]
    },
    {
      name: 'Asian Starters',
      items: [
        { name: 'Spring Rolls', price: 249, image: 'https://images.unsplash.com/photo-1553621042-d8a7921a7b3e' },
        { name: 'Chicken Satay', price: 299, image: 'https://images.unsplash.com/photo-1582473513703-c3c2dbc442aa' },
        { name: 'Paneer Chilli', price: 269, image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092' },
        { name: 'Crispy Veg', price: 229, image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543' },
      ]
    },
    {
      name: 'Coffee',
      items: [
        { name: 'Espresso', price: 99, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93' },
        { name: 'Cappuccino', price: 149, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348' },
        { name: 'Latte', price: 169, image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187' },
        { name: 'Mocha', price: 179, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085' },
      ]
    },
    {
      name: 'Tea',
      items: [
        { name: 'Masala Tea', price: 79, image: 'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5' },
        { name: 'Green Tea', price: 99, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93' },
        { name: 'Black Tea', price: 89, image: 'https://images.unsplash.com/photo-1527515637468-1ba4f3b6f29f' },
        { name: 'Lemon Tea', price: 109, image: 'https://images.unsplash.com/photo-1559611053-ebd3ecd8a5df' },
      ]
    },
    {
      name: 'Hot Chocolate',
      items: [
        { name: 'Classic Hot Chocolate', price: 149, image: 'https://images.unsplash.com/photo-1601924582971-5d9ec7a1d50b' },
        { name: 'Dark Hot Chocolate', price: 159, image: 'https://images.unsplash.com/photo-1586201375761-83865001e64b' },
        { name: 'Hazelnut Hot Chocolate', price: 169, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587' },
        { name: 'White Hot Chocolate', price: 179, image: 'https://images.unsplash.com/photo-1605470051744-4888aada8cfa' },
      ]
    },
    {
      name: 'Cold Coffee',
      items: [
        { name: 'Iced Americano', price: 149, image: 'https://images.unsplash.com/photo-1563306406-7d4f2b61d434' },
        { name: 'Iced Latte', price: 169, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93' },
        { name: 'Cold Coffee with Ice Cream', price: 199, image: 'https://images.unsplash.com/photo-1576888401726-11e0b7350463' },
        { name: 'Mocha Frappe', price: 189, image: 'https://images.unsplash.com/photo-1600180758897-1e42e4db84ff' },
      ]
    },
    {
      name: 'Shakes',
      items: [
        { name: 'Chocolate Shake', price: 179, image: 'https://images.unsplash.com/photo-1586201375754-3309520c85e1' },
        { name: 'Strawberry Shake', price: 169, image: 'https://images.unsplash.com/photo-1599785209707-65d4aeadd13d' },
        { name: 'Mango Shake', price: 159, image: 'https://images.unsplash.com/photo-1589871960567-8995f8c74d4b' },
        { name: 'Oreo Shake', price: 189, image: 'https://images.unsplash.com/photo-1584261529201-c0c9cfb3a45b' },
      ]
    },
    {
      name: 'Mocktails',
      items: [
        { name: 'Virgin Mojito', price: 149, image: 'https://images.unsplash.com/photo-1571091718763-ffee34fd93f1' },
        { name: 'Blue Lagoon', price: 159, image: 'https://images.unsplash.com/photo-1569241032656-4f49e18a0f82' },
        { name: 'Green Apple Cooler', price: 149, image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c9' },
        { name: 'Strawberry Delight', price: 159, image: 'https://images.unsplash.com/photo-1563306405-89f31d4fd31f' },
      ]
    },
    {
      name: 'Burgers',
      items: [
        { name: 'Veg Burger', price: 129, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349' },
        { name: 'Chicken Burger', price: 149, image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb47' },
        { name: 'Cheese Burger', price: 139, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90' },
        { name: 'Double Patty Burger', price: 179, image: 'https://images.unsplash.com/photo-1553386782-21d5fbcbb27e' },
      ]
    },
    {
      name: 'Sandwiches',
      items: [
        { name: 'Veg Sandwich', price: 119, image: 'https://images.unsplash.com/photo-1559622218-5ba9f3f3464a' },
        { name: 'Grilled Cheese Sandwich', price: 129, image: 'https://images.unsplash.com/photo-1572441712401-1a3e08f47e2c' },
        { name: 'Chicken Sandwich', price: 149, image: 'https://images.unsplash.com/photo-1552913906-4a5b46f22343' },
        { name: 'Club Sandwich', price: 169, image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb47' },
      ]
    },
    {
      name: 'Italian Pastas',
      items: [
        { name: 'Penne Alfredo', price: 249, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90' },
        { name: 'Penne Arrabiata', price: 229, image: 'https://images.unsplash.com/photo-1553621042-5b8f4b273b8e' },
        { name: 'Spaghetti Bolognese', price: 269, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349' },
        { name: 'Veg Lasagna', price: 279, image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb47' },
      ]
    },
    {
      name: 'Dessert',
      items: [
        { name: 'Chocolate Brownie', price: 149, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb' },
        { name: 'Gulab Jamun', price: 99, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90' },
        { name: 'Cheesecake', price: 199, image: 'https://images.unsplash.com/photo-1553621042-5b8f4b273b8e' },
        { name: 'Ice Cream Sundae', price: 179, image: 'https://images.unsplash.com/photo-1486115180097-4d8d2292f15d' },
      ]
    },
  ];



  @ViewChild(CartModelComponent)
  bottomModal!: CartModelComponent;


  constructor(private cartService: CartService) {

    this.cartService.cartItems$.subscribe(item => {
      this.cartCount = item.reduce((sum, item) => sum + item.quantity, 0);
      if (this.cartCount === 0 && this.bottomModal) {
        this.bottomModal.isVisible = false;
      }

    })
  }
  
  ngOnInit(): void {

    const wasVisible = this.cartService.getCurrentVisibility();
  this.isVisible = wasVisible;

  this.cartService.cartVisible$.subscribe(visible => {
    this.isVisible = visible;
  });

  // ✅ Show modal if previously visible
  if (wasVisible) {
    // Delay it just a bit to allow view to fully load
    setTimeout(() => {
      this.bottomModal?.showModal(this.cartCount);
    }, 0);
  }
}

  onItemAdded() {
    this.bottomModal?.showModal(this.cartCount);
  }

}
