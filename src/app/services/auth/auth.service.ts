import { inject, Injectable } from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, UserInfo } from "@angular/fire/auth";
import { concatMap, from, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private auth = inject(Auth);

    constructor() { }

    // Get current auth state
    currentUser$: Observable<UserInfo> = authState(this.auth);

    // Login function
    login(email: any, password: any ) {
        return from(signInWithEmailAndPassword(this.auth, email, password));
    }

    // Logout function
    logout() {
        return from(this.auth.signOut());
    }

    // singup function
    signUp(email: any, password: any) {
        return from(createUserWithEmailAndPassword(this.auth, email, password));
    }

    // user profile update function
    updateUser(userData: Partial<UserInfo>): Observable<any> {
        const user = this.auth.currentUser;
        return of(user).pipe(
            concatMap(user => {
                if (!user) throw new Error('Non authentifié');

                return updateProfile(user, userData);
            })
        )
    }
}