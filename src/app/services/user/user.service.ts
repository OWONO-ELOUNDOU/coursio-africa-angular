import { inject, Injectable } from "@angular/core";
import { Firestore, setDoc, doc } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private firestore = inject(Firestore);

    constructor() { }
    
    createUser(userId: string, user: any) {
        return setDoc(doc(this.firestore, 'Users', `${userId}`), {
            uid: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password,
            street: user.street,
            twon: user.twon,
            region: user.region
        })
    }
}