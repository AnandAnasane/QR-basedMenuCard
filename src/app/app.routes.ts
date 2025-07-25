import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PayBillsComponent } from './pages/pay-bills/pay-bills.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [


    { path: '', component: HomeComponent }, 
    { path: 'menu', component: MenuComponent },
    { path: 'order', component: OrdersComponent },
    { path: 'paybills', component: PayBillsComponent },
    { path: 'cart', component: CartComponent },

    { path: '**', redirectTo: '' },

   
    // {
    //     path: '', 
    //     component: HomeComponent
    // },
    // {   path: 'home', component: HomeComponent},
    // {   path: 'menu', component: MenuComponent },
    // {   path: 'order', component: OrdersComponent},
    // {   path: 'paybills', component: PayBillsComponent}
];
