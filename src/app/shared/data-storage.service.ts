import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../Auth/auth/auth.service";

@Injectable({providedIn:'root'})

export class DataStorageService{
    
    constructor(
        private http:HttpClient,
        private recipeService:RecipeService,
        private authService:AuthService
    ){}

    storeRecipe(){
        const recipes = this.recipeService.getRecipe();
         this.http.put('https://recipebook-7f291-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response=>{
             console.log(response)
         })
    }

    fetchRecipe(){
        return this.http.get<Recipe[]>('https://recipebook-7f291-default-rtdb.firebaseio.com/recipes.json',)
        .pipe(map(recipes=>{
            return recipes.map(recipe=>{
                return {
                    ...recipe,
                    ingredients:recipe.ingredients?recipe.ingredients:[]
                    }
                })
            }),
            tap(recipes=>{
                this.recipeService.setRecipe(recipes);
            })
        )
    }
}