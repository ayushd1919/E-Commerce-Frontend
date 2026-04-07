import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

export const adminLoadGuard: CanMatchFn = (route, segments) => {
  return inject(AuthService).getRole() === UserRole.ADMIN
};
