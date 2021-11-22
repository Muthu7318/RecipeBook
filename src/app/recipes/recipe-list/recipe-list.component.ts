import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
//import { relative } from 'path';
import{Recipe} from '../recipe.model'
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
 
  recipes:Recipe[];
  subs:Subscription;
  constructor( private recipeSer:RecipeService, private router:Router,
    private route:ActivatedRoute) { 

  }

  ngOnInit() {
    console.log(this.recipes)
    this.subs = this.recipeSer.recipeChanged.subscribe((recipes:Recipe[])=>{
        this.recipes=recipes;
    })
    this.recipes = this.recipeSer.getRecipe();
  }

  onClickNewRecipe(){
    this.router.navigate(["new"],{relativeTo:this.route})
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
