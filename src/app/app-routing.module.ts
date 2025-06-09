import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { LocalizacaoComponent } from './pages/localizacao/localizacao.component';
import {FornecedoresComponent} from "./pages/fornecedores/fornecedores.component";
import {ProdutosComponent} from "./pages/produtos/produtos.component";
import {NotasComponent} from "./pages/notas/notas.component";
import {ItensNotaComponent} from "./pages/itens-nota/itens-nota.component";
import {AutoresComponent} from "./pages/autores/autores.component";
import {LivrosComponent} from "./pages/livros/livros.component";
import {AvaliacoesComponent} from "./pages/avaliacoes/avaliacoes.component";

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'livros',
    component: LivrosComponent,
  },
  {
    path: 'autores',
    component: AutoresComponent,
  },
  {
    path: 'avaliacoes',
    component: AvaliacoesComponent,
  },
  {
    path: 'localizacao',
    component: LocalizacaoComponent,
  },
  {
    path: 'fornecedores',
    component: FornecedoresComponent,
  },
  {
    path: 'produtos',
    component: ProdutosComponent,
  },
  {
    path: 'notas',
    component: NotasComponent,
  },
  {
    path: 'itensNota',
    component: ItensNotaComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
  ]
})
export class AppRoutingModule { }
