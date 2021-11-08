import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CookieService]
})
export class AppComponent {

  loaded: boolean = false

    d = new Date()
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
    dayName = this.days[this.d.getDay()]
    dayMonth = this.d.getDate()
    month = this.monthNames[this.d.getMonth()]
    sufix = this.dayMonth > 3 ? 'th' : (this.dayMonth === 1 ? 'st' : (this.dayMonth === 2 ? 'nd': 'rd'))

    compMenu= false
    expandedHover= false

    openOptions= false
    openParams= false

    mode='side'

    autosize = true

    tabParametersChange= 0

    openCategories = false

    tabSelect = 0
    topNav = false
    url:any

  public position: string = 'top-right';

  constructor(private route: ActivatedRoute, private router: Router, private cookieService: CookieService) {

  }

  ngOnInit() {
    window.onload = () => {
        this.loaded = true
        this.loadTopNav()
    }
    window.onresize = () => {
      this.contextHeight()
    }
  }

  compresedMenu(){
    this.compMenu=!this.compMenu
  }
  
  expandMenu(){
    this.compMenu? this.expandedHover=true : false
  }

  tabSelectParameter(i:number){
    this.tabParametersChange = i
  }

  contextHeight(){
    const height = window.innerHeight
    return height
  }

  routing(tab:number) {
    tab == 0 ? this.router.navigate(['/hotels']) : false
    // tab == 1 ? this.router.navigate(['/transfers']) : false
    // tab == 2 ? this.router.navigate(['/activities']) : false
  }

  loadTopNav(){
    this.url = this.route
    setTimeout(() => {
      this.url == '/dashboard' ? this.topNav = false : this.topNav = true
    }, 500);
  }

  clearCookies(): void {
    this.cookieService.delete("selectedEstablishmentId");
    this.cookieService.delete("selectedTransferId");
  }
}
