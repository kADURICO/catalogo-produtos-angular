import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../../servicos/produtos/produtos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private produtosService: ProdutosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
}
