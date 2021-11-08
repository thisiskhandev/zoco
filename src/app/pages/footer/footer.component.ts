import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'usb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  menuHidden = true;
  private userMail: string = "ernesto.montes@acorde.com.ve";
  constructor(private router: Router) { }

  ngOnInit() {
  }
  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    //
  }

  itinerary(){
    this.router.navigate(['itinerary']);
  }

  get username(): string {
    return this.userMail;
  }

}
