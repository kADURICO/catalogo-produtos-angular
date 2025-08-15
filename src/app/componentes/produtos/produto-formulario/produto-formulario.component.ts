import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProdutosService } from '../../../servicos/produtos/produtos.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-produto-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './produto-formulario.component.html',
  styleUrls: ['./produto-formulario.component.css']
})
export class ProdutoFormularioComponent implements OnInit {
  produtoForm: FormGroup;
  isEditMode = false;
  produtoId: number | null = null;
  tituloPagina = 'Criar Novo Produto';

  constructor(
    private fb: FormBuilder,
    private produtosService: ProdutosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.produtoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      discountPercentage: [0, Validators.min(0)],
      brand: [''],
      category: [''],
      availabilityStatus: [''],
      stock: [0, Validators.min(0)],
      minimumOrderQuantity: [1, Validators.min(1)],
      warrantyInformation: [''],
      shippingInformation: [''],
      returnPolicy: [''],
      weight: [0, Validators.min(0)],
      dimensions: this.fb.group({
        width: [0, Validators.min(0)],
        height: [0, Validators.min(0)],
        depth: [0, Validators.min(0)],
      }),
      thumbnail: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.produtoId = Number(id);
        this.tituloPagina = 'Editar Produto';
        
        try {
          const produto = await lastValueFrom(this.produtosService.getProduto(this.produtoId));
          this.produtoForm.patchValue(produto);
        } catch (err) {
          console.error('Erro ao carregar dados do produto:', err);
        }
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.produtoForm.valid) {
      const formValue = this.produtoForm.value;
      try {
        if (this.isEditMode && this.produtoId !== null) {
          await lastValueFrom(this.produtosService.updateProduto(this.produtoId, formValue));
          console.log('Produto atualizado com sucesso!');
        } else {
          await lastValueFrom(this.produtosService.createProduto(formValue));
          console.log('Produto criado com sucesso!');
        }
        this.router.navigate(['/lista-de-produtos']);
      } catch (err) {
        console.error('Erro na operação do produto:', err);
      }
    }
  }

  voltar(): void {
    this.router.navigate(['/lista-de-produtos']);
  }
}