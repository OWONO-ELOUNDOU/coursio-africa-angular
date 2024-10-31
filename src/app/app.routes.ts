import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/Home/home.component';

import { AuthGuard } from './Guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Accueil'
  },
  {
    path: 'about',
    loadComponent: (() => import('./Pages/about/about.component').then((c) => c.AboutComponent)),
    title: 'A Propos'
  },
  {
    path: 'task/form',
    loadComponent: (() => import('./Pages/task-form/task-form.component').then((c) => c.TaskFormComponent)),
    title: 'Task Form'
  },
  {
    path: 'contact',
    loadComponent: (() => import('./Pages/contact/contact.component').then((c) => c.ContactComponent)),
    title: 'Contact'
  },
  {
    path: 'partner',
    loadComponent: (() => import('./Pages/partner/partner.component').then((c) => c.PartnerComponent)),
    title: 'Partenariat'
  },
  {
    path: 'checkout',
    loadComponent: (() => import('./Pages/checkout/checkout.component').then((c) => c.CheckoutComponent)),
    title: 'Paiement'
  },
  {
    path: 'login',
    loadComponent: (() => import('./Pages/login/login.component').then((c) => c.LoginComponent)),
    title: 'Connexion'
  },
  {
    path: 'signup',
    loadComponent: (() => import('./Pages/signup/signup.component').then((c) => c.SignupComponent)),
    title: 'Inscription'
  }
];
