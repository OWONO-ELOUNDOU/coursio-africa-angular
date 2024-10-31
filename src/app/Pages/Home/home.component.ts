import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Import components
import { NavbarComponent } from '../../Components/Navbar/navbar.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  private authService = inject(AuthService);
  user$ = this.authService.currentUser$;

  constructor() { }
}
