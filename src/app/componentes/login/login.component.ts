import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CaixaDialogoInformacaoConfirmacaoComponent } from '../dialogos/caixa-dialogo-informacao-confirmacao/caixa-dialogo-informacao-confirmacao.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../servicos/autenticacao/autenticacao.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private dialog: MatDialog,
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
        this.abrirDialogo('Informação', 'Login realizado com sucesso!');
        localStorage.setItem('logado', 'true');
        this.router.navigateByUrl('/lista-de-produtos', { replaceUrl: true });
      } else {
        this.abrirDialogo('Erro', 'Usuário ou senha inválidos!');
      }
    } else {
      console.log('Formulário inválido');
      this.loginForm.markAllAsTouched();
    }
  }

  abrirDialogo(tituloDialogo: string, conteudoDialogo: string) {
    this.dialog.open(CaixaDialogoInformacaoConfirmacaoComponent, {
      width: '200px',
      height: '200px',
      data: {
        titulo: tituloDialogo,
        conteudo: conteudoDialogo
      }
    });
  }
}
