import { Component, ElementRef, OnInit, ViewChild,EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('form') slfrm:NgForm; 
  subscription:Subscription;
  editMode: boolean=false;
  editedItemIndex: number;
  editedItem:Ingredient;


  constructor(private slservice:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slservice.startedEditing.subscribe((index:number)=>{
      console.log(index);
      this.editedItemIndex = index;
      this.editMode=true;
      this.editedItem = this.slservice.getIngredient(index)
      this.slfrm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount,
      })
    });
  }
  onSubmit(form:NgForm){
    const value=form.value
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slservice.updateIngredient(this.editedItemIndex,newIngredient)
    }else{
      this.slservice.addIngredient(newIngredient);
    }
    this.editMode=false;
    this.slfrm.reset();

  }

  onClear(){
    this.slfrm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slservice.deleteIngredient(this.editedItemIndex)
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
