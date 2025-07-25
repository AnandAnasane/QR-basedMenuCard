import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories = [
    { name: 'Turkish Food', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Soup', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Sushi', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Asian Starters', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Coffee', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Tea', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Hot Chocolate', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Cold Coffee', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Cold Brew', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Shakes', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Mocktails', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Lemonades', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Iced Green Teas', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Burgers', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Sandwiches', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Turkish Pide', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Wood Fire Pizza', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Italian Pastas', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Main Course', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Chinese Appetizers', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Bao', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Thai', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Noodles', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Rice', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Sizzlers', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Healthy', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Salad', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Dessert', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Beverages', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    { name: 'Maggie', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e996923-ea11-4c29-827f-b72b7941d73a.png' },
    
  ];

  constructor() { }

  getCaregory(){
    return this.categories;
  }
}
