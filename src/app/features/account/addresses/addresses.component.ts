import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Address } from '../../../core/models/address.model';
import { UserService } from '../../../core/services/user.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-addresses',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css', '../profile.component.css']
})
export class AddressesComponent implements OnInit {

  addrForm!: FormGroup
  showForm!: boolean
  addresses$!: Observable<Address[] | undefined>
  editingAddressId: string | null = null

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.addrForm = this.fb.group({
      name: ['', [Validators.required]],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.userService.getAddress().subscribe()
    this.addresses$ = this.userService.address$.pipe(
      map(res => res?.addresses)
    )
  }
  editAddress(address: Address) {
    this.showForm = true
    this.editingAddressId = address.id

    this.addrForm.patchValue({
      name: address.name,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      pincode: address.pincode
    })
  }

  deleteAddress(id: string) {
    this.userService.deleteAddress(Number(id)).subscribe({
      next: (res) => {
        this.toastService.show(res.message, 'success')
      }
    })
  }

  saveAddress() {
    if (this.addrForm.invalid) return;

    const addressData = this.addrForm.value;

    const request$ = this.editingAddressId
      ? this.userService.updateAddress(addressData, Number(this.editingAddressId))
      : this.userService.createAddress(addressData);

    request$.subscribe({
      next: (res) => {
        this.toastService.show(res.message, 'success');

        // REFRESH DATA: Call the method that updates the BehaviorSubject in your service
        this.userService.getAddress().subscribe();

        this.cancelEdit();
      },
      error: (err) => {
        this.toastService.show('Failed to save address', 'error');
      }
    });
  }

  cancelEdit() {
    this.showForm = false;
    this.editingAddressId = null;
    this.addrForm.reset();
  }
}
