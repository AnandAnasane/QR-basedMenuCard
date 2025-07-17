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

   searchTerm: string = '';

  items = [
    { name: 'Apple' },
    { name: 'Orange' },
    { name: 'Banana' },
    { name: 'Mango' },
  ];

  filteredItems() {
    if (!this.searchTerm) {
      return this.items;
    }

    return this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
