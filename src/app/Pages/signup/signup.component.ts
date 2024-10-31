import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { switchMap } from 'rxjs';


@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
    private route = inject(Router);
    private authService = inject(AuthService);
    private userService = inject(UserService);
    private toastService = inject(HotToastService);

    signupForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        role: new FormControl(''),
        street: new FormControl('', Validators.required),
        twon: new FormControl('', Validators.required),
        region: new FormControl('', Validators.required)
    });

    constructor() { }

    get firstName() {
        return this.signupForm.get('firstName');
    }
    get lastName() {
        return this.signupForm.get('lastName');
    }
    get email() {
        return this.signupForm.get('email');
    }
    get password() {
        return this.signupForm.get('password');
    }
    get phoneNumber() {
        return this.signupForm.get('phoneNumber');
    }
    get street() {
        return this.signupForm.get('street');
    }
    get twon() {
        return this.signupForm.get('twon');
    }
    get region() {
        return this.signupForm.get('region');
    }
    
    onSubmit() {
        if (!this.signupForm.valid) {
            this.signupForm.markAllAsTouched;
        }

        this.signupForm.patchValue({ role: 'user' });
        console.table(this.signupForm.value);
        const { firstName, email, password } = this.signupForm.value;
        try {
            this.authService.signUp(email, password).pipe(
                switchMap(({ user: { uid } }) => this.userService.createUser(uid, this.signupForm.value)),
                this.toastService.observe({
                    success: 'registration successfull',
                    loading: 'saving...',
                    error: 'registration failed'
                })
            )
                .subscribe(() => {
                    this.route.navigate(['/home']);
                }, (error) => this.toastService.error(error.message));
        } catch (error) {
            this.toastService.error('Une erreur est survenue!');
        }
    }
}