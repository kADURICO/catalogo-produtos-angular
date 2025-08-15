import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();

  constructor(private router: Router) {
    this.loggedIn.next(localStorage.getItem('logado') === 'true');
  }

  login(credentials: { email: string; senha: string }): boolean {
    if (credentials.email === 'admin@admin.com' && credentials.senha === '12345') {
      this.loggedIn.next(true);
      localStorage.setItem('logado', 'true');
      localStorage.setItem('role', 'admin');
      return true;
    }
    if (credentials.email === 'user@user.com' && credentials.senha === '12345') {
      this.loggedIn.next(true);
      localStorage.setItem('logado', 'true');
      localStorage.setItem('role', 'user');
      return true;
    }
    this.logout();
    return false;
  }


  logout(): void {
    this.loggedIn.next(false);
    localStorage.removeItem('logado');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }
}