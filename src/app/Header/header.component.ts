import { templateJitUrl } from "@angular/compiler";
import { Component,EventEmitter,OnDestroy,OnInit,Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../Auth/auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";


@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    
    
})
    
export class HeaderComponent implements OnInit,OnDestroy{
    private userSub:Subscription;
    isAuthenticated=false;
    collapsed = true;
    
    constructor(private dataStorgeService:DataStorageService,private authService:AuthService){}
    ngOnInit(){
        this.userSub = this.authService.user.subscribe(user=>{
            //debugger;
            this.isAuthenticated = !user ? false:true;
        });
    }
    onSaveData(){
        this.dataStorgeService.storeRecipe()
    }

    onFetchData(){
        this.dataStorgeService.fetchRecipe().subscribe();
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }

    onLogout(){
        this.authService.logOut();
    }
}