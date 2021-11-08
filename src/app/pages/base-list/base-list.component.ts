import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { BaseListEnum } from './shared/base-list-enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryList } from './category-list/category-list';
import { CookieService } from 'ngx-cookie-service';
import { NavigatorEnum } from '@hotel/shared/navigator-enum';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.css']
})
export class BaseListComponent implements AfterViewInit, OnInit {

  @ViewChild (MatPaginator) paginator: MatPaginator;
  @ViewChild ("categoryList") listCategoryChild;

  @Input() idList : any;
  baseListEnum = BaseListEnum;
  titleList: string;
  // route: ActivatedRoute;
  pageSizeOptions = [5,10,50,100];


  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private cookieService: CookieService 
  ) {
    // route.queryParams.subscribe( prm => {
    //   prm['tab']=== undefined ? this.tabSelect = 0 : this.tabSelect = prm['tab']
    // })
    this.route = route;
  }

  ngAfterViewInit(){
    if (this.listCategoryChild) {
      this.listCategoryChild.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit() {
    //se subscribe al evento de cambio de parametros del route,
    //por un cambio de valor en los parametros no se ejecuta el ngOnInit
    this.route.params.subscribe(params => {
      //cada vez que hay cambio de parametros se ejecuta esta sección de código
       this.idList = params['idList'];
       this.setTitle();
     });
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.listCategoryChild.dataSource.filter = filterValue;
  }

  setTitle() {
    if (this.idList == BaseListEnum.hotelList) {
      this.titleList = BaseListEnum.hotelTitle;
    }
    else if (this.idList == BaseListEnum.transferList) {
      this.titleList = BaseListEnum.transferTitle;
    }
    else if (this.idList == BaseListEnum.activityList) {
      this.titleList = BaseListEnum.activityTitle;
    }
    else {
      this. titleList = BaseListEnum.emptyString;
    }
  }


  clearCookies(): void {
    this.cookieService.delete(BaseListEnum.selectedEstablishmentIdCookieName);
    this.cookieService.delete(BaseListEnum.selectedTransferIdCookieName);
  }

}
