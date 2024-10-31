import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { environment } from '../../../environment/environment';

// Import Service
import {HotToastService} from '@ngneat/hot-toast';
import {CheckoutService} from '../../services/checkout/checkout.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent {
  private formBuilder = inject(FormBuilder);
  private toastService = inject(HotToastService);
  private checkoutService = inject(CheckoutService);

  // Get task form from localStorage
  taskForm = JSON.parse(localStorage.getItem('task') || '{}');

  // Dohone configuration
  price = '3000';

  checkoutForm: any = this.formBuilder.group({
    rN: '',
    rE: '',
    rT: '',
    rI: '',
    cmd: 'start',
    rDvs: 'XAF',
    rH: environment.dohone.apiKey,
    rMt: this.price,
    rLocale: 'fr',
    motif: 'Payment d\'un service sur coursio africa',
    source: 'DIGITAL DIRECT ASSISTANCE',
    endPage: 'https://coursioafrica-fbbec.web.app/task/form',
    cancelPage: 'https://coursioafrica-fbbec.web.app/checkout',
    notifyPage: 'https://coursioafrica-fbbec.web.app/checkout',
    logo: 'https://coursioafrica-fbbec.web.app/assets/images/icons/logo.webp'
  })

  constructor() {
  }

  createInvoiceId() {
    return 'INVOICE-' + Math.random().toString(36).substr(2, 16);
  }

  onSubmit() {
    if (!this.checkoutForm.valid) this.checkoutForm.markAllAsTouched();

    const taskId = this.createInvoiceId();
    try {
      this.checkoutService.createTransaction(this.checkoutForm.value, taskId, 'user-iBADUVXAVOXA').pipe(
        this.toastService.observe({
          success: 'Transaction initiée',
          loading: 'Enregistrement de la transaction',
          error: 'Echec de la transaction'
        })
      )
        .subscribe((response) => {
          const params = new URLSearchParams(this.checkoutForm.value);
          window.location.href = environment.dohone.endPoint + '?' + params.toString();
        }, (error) => this.toastService.error(error.message));
    } catch (error) {
        this.toastService.error('Une erreur est survenue');
    }
  }
}
