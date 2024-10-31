import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Import Components
import { NavbarComponent } from '../../Components/Navbar/navbar.component';
import { FooterComponent } from '../../Components/footer/footer.component';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [ReactiveFormsModule, NavbarComponent, FooterComponent],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})

export class ContactComponent {
    contactForm = new FormGroup({
        username: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        object: new FormControl('', Validators.required),
        content: new FormControl('', Validators.required)
    });

    constructor() { }
    
    onSubmit() {
        if (!this.contactForm.valid) this.contactForm.markAllAsTouched;
        console.table(this.contactForm.value);
    }
}