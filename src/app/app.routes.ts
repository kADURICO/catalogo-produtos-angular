import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { ListagemProdutosComponent } from './componentes/produtos/listagem-produtos/listagem-produtos.component';
import { DetalhesProdutoComponent } from './componentes/produtos/detalhes-produto/detalhes-produto.component';


export const routes: Routes = [
    {path: '', component: LoginComponent},
    { path: 'produto/:id', component: DetalhesProdutoComponent },
    {path: 'lista-de-produtos', component: ListagemProdutosComponent}
];
