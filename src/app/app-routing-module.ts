import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";



const appRoutes:Routes =[
    {path:'', redirectTo:'/recipes',pathMatch:'full'},
    // {path:'recipes',loadChildren:'./recipes/recipes.module#RecipeModule'},
    {path:'recipes',
    loadChildren:()=>import('./recipes/recipes.module').then(m => m.RecipeModule)},
    {path:'shopping-list',
    loadChildren:()=>import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
   // loadChildren:'./shopping-list/shopping-list.module#ShoppingListModule'},
    {path:'auth',
    //loadChildren:'./Auth/auth/auth.module#AuthModule'}
    loadChildren:()=>import('./Auth/auth/auth.module').then(m => m.AuthModule)}
]; 

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
  exports:[RouterModule]  
})
export class appRoutingModule{}

