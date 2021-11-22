import { Ingredient } from "../shared/Ingredient.model";

export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients:Ingredient[];

    constructor (nm:string,desc:string,imgPath:string, ingredient:Ingredient[]){
        this.name=nm;
        this.description=desc;
        this.imagePath=imgPath;
        this.ingredients=ingredient;
    }
}