import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
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

}
