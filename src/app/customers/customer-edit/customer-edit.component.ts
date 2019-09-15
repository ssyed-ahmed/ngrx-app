import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from'@ngrx/store';

import * as customerActions from '../state/customer.actions';
import * as fromCustomer from '../state/customer.reducer';
import { Customer } from '../customer.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomer.AppState>
  ) { }

  ngOnInit() {
    this.createForm();

    const customer$: Observable<Customer> = this.store.select(
      fromCustomer.getCurrentCustomer
    )

    customer$.subscribe(currentCustomer => {
      if (currentCustomer) {
        this.customerForm.patchValue({
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          membership: currentCustomer.membership,
          id: currentCustomer.id
        });
      }
    })
  }

  createForm() {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      membership: ['', Validators.required],
      id: null
    })
  }  

  editCustomer() {
    const updateCustomer: Customer = {
      name: this.customerForm.get('name').value,
      phone: this.customerForm.get('phone').value,
      address: this.customerForm.get('address').value,
      membership: this.customerForm.get('membership').value,
      id: this.customerForm.get('id').value
    };

    new customerActions.UpdateCustomer(updateCustomer);
  }

}
