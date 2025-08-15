import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdutosService } from '../../../servicos/produtos/produtos.service';
import { MatDialog } from '@angular/material/dialog';
import { CaixaDialogoInformacaoConfirmacaoComponent } from '../../dialogos/caixa-dialogo-informacao-confirmacao/caixa-dialogo-informacao-confirmacao.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  produto: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtosService: ProdutosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.produtosService.getProduto(id).subscribe({
        next: (data) => {
          this.produto = data;
          if (this.produto.discountPercentage > 0) {
            this.produto.precoOriginal = this.produto.price / (1 - this.produto.discountPercentage / 100);
          }
        },
        error: (err) => {
          console.error('Erro ao buscar detalhes do produto:', err);
          this.router.navigate(['/lista-de-produtos']);
        }
      });
    });
  }

  async excluirProduto(id: number): Promise<void> {
    const dialogRef = this.dialog.open(CaixaDialogoInformacaoConfirmacaoComponent, {
      data: {
        titulo: 'Confirmar Exclusão',
        conteudo: 'Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.',
        textoConfirmar: 'Excluir',
        textoCancelar: 'Cancelar'
      }
    });

    try {
      const result = await lastValueFrom(dialogRef.afterClosed());
      if (result) {
        await lastValueFrom(this.produtosService.deleteProduto(id));
        console.log('Produto excluído com sucesso!');
        this.router.navigate(['/lista-de-produtos']);
      }
    } catch (err) {
      console.error('Ocorreu um erro no processo de exclusão:', err);
    }
  }
}