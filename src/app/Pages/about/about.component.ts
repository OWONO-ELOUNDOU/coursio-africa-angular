import { Component } from '@angular/core';

// Import Components
import { NavbarComponent } from '../../Components/Navbar/navbar.component';
import { FooterComponent } from '../../Components/footer/footer.component';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [NavbarComponent, FooterComponent],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})

export class AboutComponent {

}