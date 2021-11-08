import { RouterStateSnapshot,  ActivatedRouteSnapshot,  Router, Route, CanLoad, CanActivate} from '@angular/router';
import { Injectable, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Environment } from 'environments/environment';
import { UsblickCommonEnum } from '../usblick-common-enum';

@Injectable()
export class AuthorizatedGuard implements CanLoad, CanActivate {
  private module : string;
  public url : string;

  constructor(
    private _router:Router, 
    private _auth:AuthService
    ) {
    this.module = Environment.module;
    this.url = window.location.href;
  }

  canLoad (route: Route) {
    return this.canMethod();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
   return this.canMethod();
  }

  canMethod () {
    if (Environment.ActivateGuard) {
      let token = this._auth.getCookie(UsblickCommonEnum.cookieName);
      if(token) { // token exists

          let data = {
            token: token,
            module: this.module
          };

          this._auth.validate(data, UsblickCommonEnum.Bearer).subscribe(
            (data:any) => { // valid token
                if ( data.res == UsblickCommonEnum.emptyResponse)  { // invalid user, it doesn't belongs to this module.
                    this.letsRedirect();
                } else {
                  let user_role = data.det[1]; // this is the user's role!.
                }
            },
            error => { //  other error
              this.letsRedirect();
            }
          );

          return true;
      } else { // user don't have token
          this.letsRedirect();
      }

      
    } else {
      return true;
    }    
  }


  letsRedirect(){
     window.location.href = Environment.authAppUrl + UsblickCommonEnum.redirectQuery + encodeURIComponent(this.url);
  }

}