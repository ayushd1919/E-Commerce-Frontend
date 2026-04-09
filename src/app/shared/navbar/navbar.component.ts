import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule, SlicePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Type } from '../../core/models/type.model';
import { TaxanomyService } from '../../core/services/taxanomy.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, SlicePipe, FormsModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentUser$!: Observable<User | null>
  type$!: Observable<Type[]>
  searchQuery: string = ''
  userName!: string | null
  user!: User | null
  
  constructor(private authService: AuthService,
    private taxanomyService: TaxanomyService
  ){
    this.currentUser$ = authService.user$
    this.type$ = this.taxanomyService.getType().pipe(map(res => res.type))
    this.userName = localStorage.getItem('userName')
    this.user = this.authService.userSubject.value
  }

  onSearch(){}
}
