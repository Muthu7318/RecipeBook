import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:Ingredient[];
  private ingSubscription:Subscription;
  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients=this.slService.getIngredients();
    this.ingSubscription =  this.slService.ingredientChanged
    .subscribe((ingredient:Ingredient[])=>{
      this.ingredients=ingredient;
    });
  }

  onEditItem(i:number){
    this.slService.startedEditing.next(i);
  }

  ngOnDestroy(){
    this.ingSubscription.unsubscribe();
  }

}
