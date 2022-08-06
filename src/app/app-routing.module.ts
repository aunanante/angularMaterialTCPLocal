import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitComponent } from './components/products/produit/produit.component';

const routes: Routes = [
  { 
    path:'',
    redirectTo:'app-produit',
    pathMatch:'full'
  },
  {
    path:'app-produit',
    component:ProduitComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
