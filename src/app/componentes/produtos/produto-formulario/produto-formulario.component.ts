import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ProdutosService } from '../../../servicos/produtos/produtos.service';
import { MatDialog } from '@angular/material/dialog';
import { CaixaDialogoInformacaoConfirmacaoComponent } from '../../dialogos/caixa-dialogo-informacao-confirmacao/caixa-dialogo-informacao-confirmacao.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-produto-formulario',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './produto-formulario.component.html',
  styleUrls: ['./produto-formulario.component.css']
})
export class ProdutoFormularioComponent implements OnInit {
  produtoForm: FormGroup;
  tituloPagina: string = 'Adicionar Produto';
  modoEdicao: boolean = false;
  produtoId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtosService: ProdutosService,
    private dialog: MatDialog
  ) {
    this.produtoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      discountPercentage: new FormControl(0, Validators.min(0)),
      brand: new FormControl(''),
      category: new FormControl(''),
      availabilityStatus: new FormControl(''),
      stock: new FormControl(0, Validators.min(0)),
      minimumOrderQuantity: new FormControl(1, Validators.min(1)),
      warrantyInformation: new FormControl(''),
      shippingInformation: new FormControl(''),
      returnPolicy: new FormControl(''),
      weight: new FormControl(0, Validators.min(0)),
      dimensions: new FormGroup({
        width: new FormControl(0, Validators.min(0)),
        height: new FormControl(0, Validators.min(0)),
        depth: new FormControl(0, Validators.min(0))
      }),
      thumbnail: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.modoEdicao = true;
        this.tituloPagina = 'Editar Produto';
        this.produtoId = Number(id);
        this.produtosService.getProduto(this.produtoId).subscribe(produto => {
          this.produtoForm.patchValue(produto);
        });
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/lista-de-produtos']);
  }

  async onSubmit(): Promise<void> {
    if (this.produtoForm.valid) {
      const dialogRef = this.dialog.open(CaixaDialogoInformacaoConfirmacaoComponent, {
        data: {
          titulo: 'Confirmar Salvar',
          conteudo: 'Tem certeza que deseja salvar as alterações?',
          textoConfirmar: 'Salvar',
          textoCancelar: 'Cancelar'
        }
      });

      try {
        const result = await lastValueFrom(dialogRef.afterClosed());
        if (result) {
          this.salvarProduto();
        }
      } catch (err) {
        console.error('Ocorreu um erro ao abrir a caixa de diálogo:', err);
      }
    } else {
      console.log('Formulário inválido');
      this.produtoForm.markAllAsTouched();
    }
  }

  private salvarProduto(): void {
    const produto = this.produtoForm.value;

    if (this.modoEdicao && this.produtoId !== null) {
      this.produtosService.updateProduto(this.produtoId, produto).subscribe(() => {
        this.router.navigate(['/lista-de-produtos']);
      });
    } else {
      this.produtosService.createProduto(produto).subscribe(() => {
        this.router.navigate(['/lista-de-produtos']);
      });
    }
  }
}