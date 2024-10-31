import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";
import { User } from "@angular/fire/auth";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})

export class NavbarComponent {
  private authService = inject(AuthService);
  user$ = this.authService.currentUser$;

  isOpen = false;

  constructor() { }
  
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
