import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizatedGuard } from './guard/authorizated.guard';
import { AuthService } from './auth/auth.service';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  providers:[
      AuthorizatedGuard,
      AuthService
  ]
})
export class SharedModule { }