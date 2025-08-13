import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { ProdutosService } from '../../../servicos/produtos/produtos.service';

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
    private produtosService: ProdutosService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.produtosService.getProduto(Number(id)).subscribe({
          next: (data) => {
            this.produto = data;
            console.log('Detalhes do produto:', this.produto);
          },
          error: (err) => {
            console.error('Erro ao buscar detalhes do produto:', err);
          }
        });
      }
    });
  }
}