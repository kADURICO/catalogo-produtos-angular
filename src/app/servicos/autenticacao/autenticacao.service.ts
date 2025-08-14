import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  public isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();

  constructor(private router: Router) { }

  login(credentials: { email: string; senha: string }): boolean {
    if (credentials.email === 'teste@teste.com.br' && credentials.senha === 'teste') {
      this.loggedIn.next(true);
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
