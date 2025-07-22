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
  imports: [HeadingComponent ,TopNavbarComponent ,BottomNavbarComponent, AddButtonComponent ,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {


}
