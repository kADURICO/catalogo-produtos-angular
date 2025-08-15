import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private apiUrl = 'https://dummyjson.com/products';
  private produtos: any[] = [];

  constructor(private http: HttpClient) {
    this.carregarProdutosIniciais();
  }

  private carregarProdutosIniciais(): void {
    const produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
      this.produtos = JSON.parse(produtosSalvos);
    } else {
      this.http.get<any>(this.apiUrl)
        .pipe(
          tap(data => {
            this.produtos = data.products.map((produto: any) => {
              if (produto.discountPercentage > 0) {
                const precoOriginal = produto.price / (1 - produto.discountPercentage / 100);
                return { ...produto, precoOriginal: Math.round(precoOriginal * 100) / 100 };
              }
              return produto;
            });
            this.salvarProdutos();
          })
        )
        .subscribe();
    }
  }

  private salvarProdutos(): void {
    localStorage.setItem('produtos', JSON.stringify(this.produtos));
  }

  getProdutos(): Observable<any[]> {
    return of(this.produtos);
  }

  getProduto(id: number): Observable<any> {
    const produto = this.produtos.find(p => p.id === id);
    return of(produto);
  }

  createProduto(novoProduto: any): Observable<any> {
    novoProduto.id = Math.floor(Math.random() * (1000000 - 31 + 1)) + 31;

    if (novoProduto.discountPercentage > 0) {
      const precoOriginal = novoProduto.price / (1 - novoProduto.discountPercentage / 100);
      novoProduto.precoOriginal = Math.round(precoOriginal * 100) / 100;
    }
    
    this.produtos.push(novoProduto);
    this.salvarProdutos();
    return of(novoProduto);
  }

  updateProduto(id: number, dadosAtualizados: any): Observable<any> {
    const index = this.produtos.findIndex(p => p.id === id);
    if (index > -1) {
      const produto = { ...this.produtos[index], ...dadosAtualizados };
      if (produto.discountPercentage > 0) {
        const precoOriginal = produto.price / (1 - produto.discountPercentage / 100);
        produto.precoOriginal = Math.round(precoOriginal * 100) / 100;
      } else {
        delete produto.precoOriginal;
      }
      this.produtos[index] = produto;
      this.salvarProdutos();
      return of(this.produtos[index]);
    }
    return of(null);
  }

  deleteProduto(id: number): Observable<any> {
    const produtoExcluido = this.produtos.find(p => p.id === id);
    this.produtos = this.produtos.filter(p => p.id !== id);
    this.salvarProdutos();
    return of(produtoExcluido);
  }
}