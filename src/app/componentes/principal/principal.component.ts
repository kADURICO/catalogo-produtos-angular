import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CaixaDialogoInformacaoConfirmacaoComponent } from '../dialogos/caixa-dialogo-informacao-confirmacao/caixa-dialogo-informacao-confirmacao.component';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, RouterLink, CommonModule, MatDialogModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  constructor(private router: Router, private dialog: MatDialog) {}

  logado: boolean = false;

  ngDoCheck(): void {
    this.logado = localStorage.getItem('logado') === 'true';
  }

  async sair() {
    const dialogRef = this.dialog.open(CaixaDialogoInformacaoConfirmacaoComponent, {
      width: '200px',
      height: '200px',
      data: {
        titulo: 'Atenção',
        conteudo: 'Deseja realmente sair?',
        textoConfirmar: 'Confirmar',
        textoCancelar: 'Cancelar'
      }
    });

    try {
      const result = await lastValueFrom(dialogRef.afterClosed());
      
      if (result) {
        localStorage.removeItem('logado');
        this.logado = false;
        this.router.navigate(['/']);
      }
    } catch (err) {
      console.error('Ocorreu um erro no processo de saída:', err);
    }
  }
}