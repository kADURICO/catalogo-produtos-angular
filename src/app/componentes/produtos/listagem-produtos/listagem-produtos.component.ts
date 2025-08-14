import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../../servicos/produtos/produtos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listagem-produtos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.css']
})
export class ListagemProdutosComponent implements OnInit {

  produtos: any[] = [];

  constructor(private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.produtosService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      }
    });
  }
}