import {inject, Injectable} from '@angular/core';
import {Firestore, setDoc, doc} from '@angular/fire/firestore';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CheckoutService {
  private firestore = inject(Firestore);

  constructor() {
  }

  createTransaction(checkout: any, taskId: any, userId: string) {
    return from(setDoc(doc(this.firestore, 'Transactions', `task-${taskId}`), {
      clientId: userId,
      clientName: checkout.rN,
      clientEmail: checkout.rE,
      phoneNumber: checkout.rT,
      price: checkout.rMt,
      motif: checkout.motif,
    }))
  }
}
