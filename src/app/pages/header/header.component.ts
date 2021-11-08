import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../pages/com.usblick.common/userProvider';
import { AuthService } from '../com.usblick.common/auth/auth.service';
import { UsblickCommonEnum } from '../com.usblick.common/usblick-common-enum';
import { Environment as environment } from 'environments/environment';
//import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserData]
})
export class HeaderComponent implements OnInit {

  fechaa = new Date().toJSON().slice(0,10).replace(/-/g,'/');;
  menuHidden = false;
  
  
  constructor(private router: Router,
    private _authService : AuthService,
    //private toastr : ToastyService,
    public _userData : UserData) { 

    }

  ngOnInit() { }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }
  

  logout() {
    let data : any = {};
    data.email = this._userData.data.email;
    data.auth_token = this._authService.getCookie(UsblickCommonEnum.cookieName);

    this._authService.logout(data).subscribe(
      (data:any) => {
        if(data.res == UsblickCommonEnum.okResp) {
          this._authService.setCookie(UsblickCommonEnum.cookieName,UsblickCommonEnum.emptyString,UsblickCommonEnum.emptyValue);
          window.location.href = environment.authAppUrl;
        } 
      },
      error => {
        //this.toastr.error(error);
      }
    );
  }

}
