import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../../servicos/produtos/produtos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CaixaDialogoInformacaoConfirmacaoComponent } from '../../dialogos/caixa-dialogo-informacao-confirmacao/caixa-dialogo-informacao-confirmacao.component';
import { lastValueFrom } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AutenticacaoService } from '../../../servicos/autenticacao/autenticacao.service';

@Component({
  selector: 'app-listagem-produtos',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatFormFieldModule, 
    MatSelectModule,    
    FormsModule         
  ],
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.css']
})
export class ListagemProdutosComponent implements OnInit {

  produtos: any[] = [];
  produtosOriginal: any[] = [];
  categorias: string[] = [];
  categoriaSelecionada: string = '';
  isAdmin: boolean = false;

  constructor(
    private produtosService: ProdutosService,
    private dialog: MatDialog,
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'admin';

    this.produtosService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        this.produtosOriginal = data;
        this.categorias = this.getUniqueCategories();
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      }
    });
  }

  getUniqueCategories(): string[] {
    const categoriesSet = new Set<string>();
    this.produtosOriginal.forEach(produto => {
      if (produto.category) {
        categoriesSet.add(produto.category);
      }
    });
    return Array.from(categoriesSet).sort();
  }

  onCategoryChange(): void {
    if (this.categoriaSelecionada) {
      this.produtos = this.produtosOriginal.filter(
        produto => produto.category === this.categoriaSelecionada
      );
    } else {
      this.produtos = this.produtosOriginal;
    }
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
        this.produtos = this.produtos.filter(p => p.id !== id);
      }
    } catch (err) {
      console.error('Ocorreu um erro no processo de exclusão:', err);
    }
  }
}