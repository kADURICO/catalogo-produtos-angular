import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        return response.products.map((produto: any) => {
          if (produto.discountPercentage > 0) {
            produto.precoOriginal = produto.price / (1 - produto.discountPercentage / 100);
          }
          return produto;
        });
      })
    );
  }

  getProduto(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(produto => {
        if (produto.discountPercentage > 0) {
          produto.precoOriginal = produto.price / (1 - produto.discountPercentage / 100);
        }
        return produto;
      })
    );
  }
}