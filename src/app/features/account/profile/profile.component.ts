import { CommonModule, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { map, Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile$!: Observable<User>

  constructor(private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.profile$ = this.userService.geProfile().pipe(
      map((res) => res.profile)
    )
    this.profile$.subscribe()
  }

  logout() { }
}
