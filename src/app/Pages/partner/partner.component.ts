import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import {
    ReactiveFormsModule,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

// Import Services
import { HotToastService } from '@ngneat/hot-toast';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

// Import Components
import { NavbarComponent } from '../../Components/Navbar/navbar.component';
import { FooterComponent } from '../../Components/footer/footer.component';



@Component({
    selector: 'app-partner',
    standalone: true,
    imports: [
        RouterLink,
        ReactiveFormsModule,
        NavbarComponent,
        FooterComponent
    ],
    templateUrl: './partner.component.html',
    styleUrls: ['./partner.component.scss']
})

export class PartnerComponent {
    private toastService = inject(HotToastService);
    private route = inject(Router)
    private userService = inject(UserService);
    private authService = inject(AuthService);

    partnerForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9)]),
        role: new FormControl(''),
        terms: new FormControl<boolean>(false),
        activities: new FormControl(''),
        street: new FormControl('', Validators.required),
        twon: new FormControl('', Validators.required),
        region: new FormControl('', Validators.required)
    })

    constructor() { }

    get firstName() {
        return this.partnerForm.get('firstName');
    }
    get lastName() {
        return this.partnerForm.get('lastName');
    }
    get email() {
      return this.partnerForm.get('email');
    }
    get password() {
      return this.partnerForm.get('password');
    }
    get phoneNumber() {
      return this.partnerForm.get('phoneNumber');
    }
    get street() {
      return this.partnerForm.get('twon');
    }
    get twon() {
      return this.partnerForm.get('twon');
    }
    get region() {
      return this.partnerForm.get('region');
    }

    onSubmit() {
        if (!this.partnerForm.valid) this.partnerForm.markAllAsTouched();

        this.partnerForm.patchValue({ role: 'Partner', terms: true });
        const { email, password } = this.partnerForm.value;
        try {
            this.authService.signUp(email, password).pipe(
                switchMap(({ user: { uid } }) => this.userService.createUser(uid, this.partnerForm.value)),
                this.toastService.observe({
                    success: 'Inscription Complète',
                    loading: 'inscription...',
                    error: 'Echec Inscription'
                })
            )
                .subscribe(() => {
                    this.route.navigate(['/home']);
                }, (error) => this.toastService.error(error.message));
        } catch (error) {
            this.toastService.error('Une erreur est survenue')
        }
    }
}
