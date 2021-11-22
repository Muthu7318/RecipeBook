import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient.model";

export class ShoppingListService{
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients:Ingredient[]=[
        new Ingredient('Apple',30),
        new Ingredient('Tomato',10)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index:number){
        return this.ingredients[index];
    }

    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngedients(ingredient:Ingredient[]){
        // for (let ingre of ingredient){
        //     this.addIngredient(ingre);
        // }
        this.ingredients.push(...ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    updateIngredient(index:number,newIngredient:Ingredient){
        this.ingredients[index]=newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}