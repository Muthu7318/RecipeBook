import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/Alert/alert/alert.component';
import { PlaceHolderDirective } from 'src/app/shared/placeHolder/placeHolder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode=true;
  isLoading=false;
  error:string=null;
  private closeSub:Subscription;
  @ViewChild(PlaceHolderDirective,{static:false}) alertHost: PlaceHolderDirective;

  

  constructor(private authService:AuthService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver) { }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm){
    let authObs:Observable<AuthResponseData>;
    this.error=null;

    if(!form.valid){
      return;
    }
    const email=form.value.email;
    const password=form.value.password;
    this.isLoading=true;
    if(this.isLoginMode){
      authObs = this.authService.login(email,password)
    } else {
      authObs = this.authService.signUp(email,password)
    }

    authObs.subscribe(responseData=>{
      console.log(responseData);
      this.isLoading=false;
      this.router.navigate(['/recipes']);
    },error=>{
      console.log(error);
      this.error = error;
      this.showErrorAlert(error)
      this.isLoading=false;
    });

    form.reset();
}

onClickingClose(){
  this.error=null;
}

private showErrorAlert(message:string){
  const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
  const hostViewContainerRef = this.alertHost.viewContainerRef;
  hostViewContainerRef.clear();
  const componentRef = hostViewContainerRef.createComponent(alertCompFactory)
  componentRef.instance.message=message
  this.closeSub = componentRef.instance.close.subscribe(()=>{
    this.closeSub.unsubscribe();
    hostViewContainerRef.clear();
  });
}

ngOnDestroy(){
  if(this.closeSub){
    this.closeSub.unsubscribe();
  }
}

}
