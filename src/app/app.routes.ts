import { Routes } from '@angular/router';
import { MainCombinedComponent } from './mainPage/main-combined/main-combined.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { BasketPageComponent } from './basket-page/basket-page.component';
import { ContactFormComponent } from './contactPage/contact-form/contact-form.component';
import { OrderPositionsComponent } from './orderPage/order-positions/order-positions.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: MainCombinedComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'basket', component: BasketPageComponent },
    { path: 'contact', component: ContactFormComponent },
    { path: 'profile', component: ProfilePageComponent },
    { path: 'menu', component: OrderPositionsComponent },
];
