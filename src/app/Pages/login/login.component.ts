import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    private toastService = inject(HotToastService);
    private authService = inject(AuthService);
    private route = inject(Router)

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    constructor() { }

    get email() {
        return this.loginForm.get('email');
    }
    get password() {
        return this.loginForm.get('password');
    }

    onSubmit() {
        if (!this.loginForm.valid) this.toastService.error('formulaire invalide');


        console.table(this.loginForm.value);
        const { email, password } = this.loginForm.value;
        try {
            this.authService.login(email, password).pipe(
                this.toastService.observe({
                    success: 'Connecté',
                    loading: 'connexion...',
                    error: 'Echec Connexion'
                })
            ).subscribe(() => {
                this.route.navigate(['/home']);
            })
        } catch (error) {
            this.toastService.error('Une erreur est survenue')
        }
    }
}