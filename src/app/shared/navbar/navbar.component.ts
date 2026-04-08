import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentUser$!: Observable<User | null>

  constructor(private authService: AuthService){
    this.currentUser$ = authService.user$
  }
}
