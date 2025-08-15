import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

import { LoginComponent } from './componentes/login/login.component';
import { ListagemProdutosComponent } from './componentes/produtos/listagem-produtos/listagem-produtos.component';
import { DetalhesProdutoComponent } from './componentes/produtos/detalhes-produto/detalhes-produto.component';
import { ProdutoFormularioComponent } from './componentes/produtos/produto-formulario/produto-formulario.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'lista-de-produtos', component: ListagemProdutosComponent, canActivate: [authGuard] },
    { path: 'produto/:id', component: DetalhesProdutoComponent, canActivate: [authGuard] },

    { path: 'produto-formulario', component: ProdutoFormularioComponent, canActivate: [authGuard, adminGuard] },
    { path: 'produto-formulario/:id', component: ProdutoFormularioComponent, canActivate: [authGuard, adminGuard] }
];