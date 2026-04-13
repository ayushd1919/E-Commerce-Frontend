import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule, SlicePipe } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Type } from '../../core/models/type.model';
import { TaxanomyService } from '../../core/services/taxanomy.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, SlicePipe, FormsModule, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  currentUser$!: Observable<User | null>
  type$!: Observable<Type[]>
  searchControl = new FormControl('')
  isAdmin!: boolean

  constructor(
    private authService: AuthService,
    private taxanomyService: TaxanomyService,
    private router: Router
  ) {
    this.currentUser$ = authService.user$
    this.type$ = this.taxanomyService.getType().pipe(map(res => res.types))
  }

  ngOnInit(): void {
    // this.currentUser$.subscribe()
    this.searchControl.valueChanges.pipe(
    debounceTime(400),             
    distinctUntilChanged()          
  ).subscribe((value) => {
    const q = value?.trim()

    this.router.navigate(['/product/list'], {
      queryParams: {
        search: q || null,   
        page: null          
      },
      queryParamsHandling: 'merge'
    })
  })
  this.isAdmin = localStorage.getItem('role') === 'ADMIN'
  }
}