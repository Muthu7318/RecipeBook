import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../Auth/auth/auth.guard";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { recipeResolver } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes:Routes=[
    {path:'',component:RecipesComponent,canActivate:[AuthGuard], children:[
        {path:'',component:RecipeStartComponent},
        {path:'new',component:RecipeEditComponent},
        {
          path:':id', 
          component:RecipeDetailsComponent,
          resolve:[recipeResolver]
        },
        {
          path:':id/edit',
          component:RecipeEditComponent,
          resolve:[recipeResolver]
        }
    ]},
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule{

}