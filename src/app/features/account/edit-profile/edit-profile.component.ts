import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { mapOneOrManyArgs } from 'rxjs/internal/util/mapOneOrManyArgs';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: '../profile.component.css'
})
export class EditProfileComponent implements OnInit {

  profileForm!: FormGroup
  isEditing: boolean = false
  profile$!: Observable<User>


  constructor(private fb: FormBuilder,
    private userService: UserService,
  ) {
    this.profileForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      mobile: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    })
  }
  ngOnInit(): void {
    this.profile$ = this.userService.geProfile().pipe(
      map((res) => res.profile),
      tap((user) => {
        if (user) {
          this.profileForm.patchValue({
            name: user.name,
            mobile: user.mobile,
            email: user.email
          })
        }
      })
    )
    this.profile$.subscribe()
  }

  toggleEdit() {
    if (this.isEditing) {
      this.userService.updateProfile(this.profileForm.getRawValue()).subscribe()
    }
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }
}
