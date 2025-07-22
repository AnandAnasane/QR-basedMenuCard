import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent {
  searchText: string = '';
  selectedIndex: number = -1;

  items: string[] = [
    'Turkish Food', 'Soup', 'Sushi', 'Asian Starters', 'Coffee', 'Tea', 'Hot Chocolate',
    'Cold Coffee', 'Cold Brew', 'Shakes', 'Mocktails', 'Lemonades', 'Iced Green Teas',
    'Burgers', 'Sandwiches', 'Turkish Pide', 'Wood Fire Pizza', 'Italian Pastas',
    'Main Course', 'Chinese Appetizers', 'Bao', 'Thai', 'Noodles', 'Rice', 'Sizzlers',
    'Healthy', 'Salad', 'Dessert', 'Beverages', 'Maggie'
  ];

  filteredItems(): string[] {
    return this.items.filter(item =>
      item.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onKeyDown(event: KeyboardEvent) {
    const filtered = this.filteredItems();
    if (event.key === 'ArrowDown') {
      if (this.selectedIndex < filtered.length - 1) {
        this.selectedIndex++;
      }
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
      event.preventDefault();
    } else if (event.key === 'Enter') {
      if (this.selectedIndex >= 0 && this.selectedIndex < filtered.length) {
        this.selectItem(filtered[this.selectedIndex]);
      }
      event.preventDefault();
    } else {
      this.selectedIndex = -1; // reset on other keypress
    }
  }

  selectItem(item: string) {
    this.searchText = item;
    this.selectedIndex = -1;
    // Perform any additional actions after selection
    console.log('Selected:', item);
  }
}
