import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterState, RouterStateSnapshot } from "@angular/router";

import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn:'root'})
export class recipeResolver implements Resolve<Recipe[]>{
    constructor(private dataStorageService:DataStorageService,private recipeservice:RecipeService){
    }

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        const recipes = this.recipeservice.getRecipe();

        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipe();
        }else{
            return recipes
        }
        
    }
}