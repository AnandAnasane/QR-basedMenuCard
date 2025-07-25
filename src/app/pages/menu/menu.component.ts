import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { BottomNavbarComponent } from '../bottom-navbar/bottom-navbar.component';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { HeadingComponent } from '../heading/heading.component';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from '../../Component/add-button/add-button.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [HeadingComponent, TopNavbarComponent, BottomNavbarComponent, AddButtonComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  imageUrl = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png';

  menuData = [
    { name: 'Turkish Food', items: [
      { name: 'Tofu in Thai Peanut Sauce', price: 299, image: this.imageUrl }, 
      { name: 'Chicken Doner', price: 399, image: this.imageUrl }, 
      { name: 'Lamb Kebab', price: 499, image: this.imageUrl }, 
      { name: 'Falafel Wrap', price: 199, image: this.imageUrl },
    ]},

    { name: 'Soup', items: [
      { name: 'Tomato Soup', price: 149, image: this.imageUrl }, 
      { name: 'Sweet Corn Soup', price: 169, image: this.imageUrl }, 
      { name: 'Manchow Soup', price: 179, image: this.imageUrl }, 
      { name: 'Hot and Sour Soup', price: 189, image: this.imageUrl },] 
    },

    { name: 'Sushi', items: [
      { name: 'Salmon Sushi', price: 499, image: this.imageUrl }, 
      { name: 'Tuna Sushi', price: 549, image: this.imageUrl }, 
      { name: 'Prawn Sushi', price: 599, image: this.imageUrl }, 
      { name: 'Veg Sushi Roll', price: 299, image: this.imageUrl },] 
    },

    { name: 'Asian Starters', items: [
      { name: 'Spring Rolls', price: 249, image: this.imageUrl }, 
      { name: 'Chicken Satay', price: 299, image: this.imageUrl }, 
      { name: 'Paneer Chilli', price: 269, image: this.imageUrl }, 
      { name: 'Crispy Veg', price: 229, image: this.imageUrl },
    ] },

    { name: 'Coffee', items: [
      { name: 'Espresso', price: 99, image: this.imageUrl }, 
      { name: 'Cappuccino', price: 149, image: this.imageUrl }, 
      { name: 'Latte', price: 169, image: this.imageUrl }, 
      { name: 'Mocha', price: 179, image: this.imageUrl },
    ] },
    
    { name: 'Tea', items: [
      { name: 'Masala Tea', price: 79, image: this.imageUrl }, 
      { name: 'Green Tea', price: 99, image: this.imageUrl }, 
      { name: 'Black Tea', price: 89, image: this.imageUrl }, 
      { name: 'Lemon Tea', price: 109, image: this.imageUrl },
    ] },

    { name: 'Hot Chocolate', items: [
      { name: 'Classic Hot Chocolate', price: 149, image: this.imageUrl }, 
      { name: 'Dark Hot Chocolate', price: 159, image: this.imageUrl }, 
      { name: 'Hazelnut Hot Chocolate', price: 169, image: this.imageUrl }, 
      { name: 'White Hot Chocolate', price: 179, image: this.imageUrl },
    ] },

    { name: 'Cold Coffee', items: [
      { name: 'Iced Americano', price: 149, image: this.imageUrl }, 
      { name: 'Iced Latte', price: 169, image: this.imageUrl }, 
      { name: 'Cold Coffee with Ice Cream', price: 199, image: this.imageUrl }, 
      { name: 'Mocha Frappe', price: 189, image: this.imageUrl },
    ] },

    { name: 'Shakes', items: [
      { name: 'Chocolate Shake', price: 179, image: this.imageUrl }, 
      { name: 'Strawberry Shake', price: 169, image: this.imageUrl }, 
      { name: 'Mango Shake', price: 159, image: this.imageUrl }, 
      { name: 'Oreo Shake', price: 189, image: this.imageUrl },
    ] },

    { name: 'Mocktails', items: [
      { name: 'Virgin Mojito', price: 149, image: this.imageUrl }, 
      { name: 'Blue Lagoon', price: 159, image: this.imageUrl }, 
      { name: 'Green Apple Cooler', price: 149, image: this.imageUrl }, 
      { name: 'Strawberry Delight', price: 159, image: this.imageUrl },
    ] },

    { name: 'Burgers', items: [
      { name: 'Veg Burger', price: 129, image: this.imageUrl }, 
      { name: 'Chicken Burger', price: 149, image: this.imageUrl }, 
      { name: 'Cheese Burger', price: 139, image: this.imageUrl }, 
      { name: 'Double Patty Burger', price: 179, image: this.imageUrl },
    ] },

    { name: 'Sandwiches', items: [
      { name: 'Veg Sandwich', price: 119, image: this.imageUrl }, 
      { name: 'Grilled Cheese Sandwich', price: 129, image: this.imageUrl }, 
      { name: 'Chicken Sandwich', price: 149, image: this.imageUrl }, 
      { name: 'Club Sandwich', price: 169, image: this.imageUrl },
    ] },

    { name: 'Italian Pastas', items: [
      { name: 'Penne Alfredo', price: 249, image: this.imageUrl }, 
      { name: 'Penne Arrabiata', price: 229, image: this.imageUrl }, 
      { name: 'Spaghetti Bolognese', price: 269, image: this.imageUrl }, 
      { name: 'Veg Lasagna', price: 279, image: this.imageUrl },
    ] },
    
    { name: 'Dessert', items: [
      { name: 'Chocolate Brownie', price: 149, image: this.imageUrl }, 
      { name: 'Gulab Jamun', price: 99, image: this.imageUrl }, 
      { name: 'Cheesecake', price: 199, image: this.imageUrl }, 
      { name: 'Ice Cream Sundae', price: 179, image: this.imageUrl },
    ] },
  ];


}
