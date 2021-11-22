import { CommonModule } from "@angular/common";
import { Placeholder } from "@angular/compiler/src/i18n/i18n_ast";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./Alert/alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loadingSpinner/loading-spinner.component";
import { PlaceHolderDirective } from "./placeHolder/placeHolder.directive";

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDirective,
        DropdownDirective
    ],
    imports:[
        CommonModule,
    ],
    exports:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDirective,
        DropdownDirective,
        CommonModule
    ],
    entryComponents:[AlertComponent]
})
export class SharedModule{

}