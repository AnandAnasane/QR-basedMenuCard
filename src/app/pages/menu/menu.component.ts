import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { BottomNavbarComponent } from '../bottom-navbar/bottom-navbar.component';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { HeadingComponent } from '../heading/heading.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [HeadingComponent ,TopNavbarComponent ,BottomNavbarComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
