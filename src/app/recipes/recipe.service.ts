
import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService{
   recipeChanged=new Subject<Recipe[]>();
   private recipes:Recipe[]=[];

      // private recipes:Recipe[]=[
      //   new Recipe('Dosa',
      //   'Dosa is a traditional food of tamilnadu',
      //   'https://sukhis.com/wp-content/uploads/2020/01/Dosa-500x400.jpg',
      //   [
      //       new Ingredient('batter',1),
      //       new Ingredient('coconut chutney',1)
      //   ]),
      //   new Recipe('Idly',
      //   'Idly is a traditional food of tamilnadu',
      //   'https://st.depositphotos.com/1354142/3438/i/600/depositphotos_34381351-stock-photo-south-indian-breakfast-on-banana.jpg',[
      //       new Ingredient('batter',1),
      //       new Ingredient('tomato chutney',1)
      //   ])
        
      // ];
      

      constructor(private slservice:ShoppingListService){

      }

      getRecipeId(index:number){
        return this.recipes[index]
      }

      setRecipe(reci:Recipe[]){
        //debugger;
        this.recipes = reci;
        this.recipeChanged.next(this.recipes.slice())
      }

      getRecipe(){
          return this.recipes.slice();
      }

      AddIngredientsToShoppingList(ingredient:Ingredient[]){
        this.slservice.addIngedients(ingredient);
      }

      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        debugger;
        this.recipeChanged.next(this.recipes.slice())
      }

      updateRecipe(index:number,newrecipe:Recipe){
        this.recipes[index] = newrecipe;
        this.recipeChanged.next(this.recipes.slice())
      }

      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice())
      }

}