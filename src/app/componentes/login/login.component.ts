import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../servicos/autenticacao/autenticacao.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const senha = this.loginForm.get('senha')?.value;

      const loginSucesso = this.autenticacaoService.login({ email, senha });

      if (loginSucesso) {
        this.abrirSnackBar('Login realizado com sucesso!', 'fechar', ['success-snackbar', 'my-custom-snackbar']);
        localStorage.setItem('logado', 'true');
        this.router.navigateByUrl('/lista-de-produtos', { replaceUrl: true });
      } else {
        this.abrirSnackBar('Usuário ou senha inválidos!', 'fechar', ['error-snackbar', 'my-custom-snackbar']);
      }
    } else {
      console.log('Formulário inválido');
      this.loginForm.markAllAsTouched();
    }
  }

  abrirSnackBar(mensagem: string, acao: string, classes: string[]) {
    this.snackBar.open(mensagem, acao, {
      duration: 3000,
      panelClass: classes,
    });
  }
}