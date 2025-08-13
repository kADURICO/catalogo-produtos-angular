import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private apiUrl = 'https://dummyjson.com/products'

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getProduto(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
