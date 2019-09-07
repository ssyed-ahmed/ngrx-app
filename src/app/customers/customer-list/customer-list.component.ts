import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as customerActions from '../state/customer.actions';

import * as fromCustomer from '../state/customer.reducer';
import { Customer } from '../customer.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers$: Observable<Customer[]>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.store.subscribe(state => {
      this.customers$ = this.store.pipe(
        select(fromCustomer.getCustomers)
      )
    });
  }

}
