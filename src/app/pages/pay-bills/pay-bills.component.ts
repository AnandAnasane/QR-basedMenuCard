import { Component } from '@angular/core';
import { BottomNavbarComponent } from '../bottom-navbar/bottom-navbar.component';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { HeadingComponent } from '../heading/heading.component';

@Component({
  selector: 'app-pay-bills',
  standalone: true,
  imports: [HeadingComponent ,BottomNavbarComponent],
  templateUrl: './pay-bills.component.html',
  styleUrl: './pay-bills.component.css'
})
export class PayBillsComponent {

}
