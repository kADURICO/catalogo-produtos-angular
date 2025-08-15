import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const logado = localStorage.getItem('logado') === 'true';

  if (logado) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};