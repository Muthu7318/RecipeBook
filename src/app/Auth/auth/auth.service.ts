import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./auth.model";

export interface AuthResponseData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:string
}

@Injectable({providedIn:'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    token:string=null;
    private tokenExpirationTimer:any;
    constructor(private http:HttpClient,private router:Router){}

    signUp(Email:string,password:string){
        
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
        {
            email:Email,
            password:password,
            returnSecureToken:true

        })
        .pipe(catchError(this.errorHandler),
            tap(resData=>{
               this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
            })
        );
    }
    
    autoLogin(){
        const userData:{
            email:string;
            id:string;
            _token:string,
            _tokenExpirationDate:string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser= new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate))

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = 
                new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
                //debugger;
            this.autoLogout(expirationDuration)
        }
    }

    login(Email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
        {
            email:Email,
            password:password,
            returnSecureToken:true

        })
        .pipe(catchError(this.errorHandler),
            tap(resData=>{
                this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
            })
        );
    }

    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }

    autoLogout(expirationDuration:number){
        console.log(expirationDuration)
        this.tokenExpirationTimer=setTimeout(()=>{
            this.logOut();
        },expirationDuration)
    }

    private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
        const expirationDate = new Date(
            new Date().getTime() + expiresIn*1000
        );
        const user = new User(
            email,userId,token,expirationDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData',JSON.stringify(user))
    }

    private errorHandler(errorRes:HttpErrorResponse){
        let errorMessage = "An unexpected Error Occurs";
        debugger;
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }else{
           
            switch(errorRes.error.error.message){
                case "EMAIL_EXISTS":
                    errorMessage="This email id already exists";
                    break;
                case "EMAIL_NOT_FOUND":
                    errorMessage="This email does not exists";
                    break;
                case "INVALID_PASSWORD":
                    errorMessage="This password is incorrect";
                    break;
                default: 
                    errorMessage ;   
            }
           
        }
        return throwError(errorMessage);
    }
        
}