import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { map, Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: '../profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile$!: Observable<User>

  constructor(private authService: AuthService,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profile$ = this.userService.geProfile().pipe(
      map((res) => res.profile)
    )
    this.profile$.subscribe()
  }

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.toastService.show(res.message, 'success')
        }, 10)
        this.router.navigate(['/home'])
      }
    })
  }
}
