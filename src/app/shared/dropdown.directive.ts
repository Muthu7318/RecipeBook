import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core"

@Directive({
    selector:'[appDropdown]'
})

export class DropdownDirective{
    @HostBinding('class.open') isopen=false;

    @HostListener('document:click',['$event']) toggleopen(data:Event){
        
        this.isopen= this.elref.nativeElement.contains(data.target) ? !this.isopen:
        false;
    }

    constructor(private elref:ElementRef){

    }
}