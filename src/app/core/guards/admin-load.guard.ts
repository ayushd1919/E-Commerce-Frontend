import { CanMatchFn } from '@angular/router';

export const adminLoadGuard: CanMatchFn = (route, segments) => {
  return true;
};
