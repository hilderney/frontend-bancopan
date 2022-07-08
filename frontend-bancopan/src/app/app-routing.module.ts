import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanComponent } from './layouts/pan/pan.component';

const routes: Routes = [


  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    component: PanComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
    ]
  },

  { path: 'nao-encontrada', loadChildren: () => import('./pages/pagina-nao-encontrada/pagina-nao-encontrada.module').then(m => m.PaginaNaoEncontradaModule) },

  { path: '**', redirectTo: 'nao-encontrada', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
