import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChildrenOutletContexts, ActivatedRoute } from '@angular/router';
import { CategoryNavigator } from './category-navigator/category-navigator';
import { BaseNavigatorEnum } from '@baseNavigator-shared/base-navigator-enum';

@Component({
  selector: 'app-base-navigator',
  templateUrl: './base-navigator.component.html',
  styleUrls: ['./base-navigator.component.css']
})
export class BaseNavigatorComponent implements OnInit {

  @Input()
  idCategory : string;
  route: ActivatedRoute;

  @ViewChild("categoryNavigator") categoryNavigator : CategoryNavigator; 

  baseNavigatorEnum = BaseNavigatorEnum;

  constructor(route: ActivatedRoute) {
    this.route = route;
  }

  ngOnInit() {
    //Se subscribe al evento de cambio de parametros del route,
    //por un cambio de valor en los parametros no se ejecuta el ngOnInit
    this.route.params.subscribe(params => {
      //cada vez que hay cambio de parametros se ejecuta esta sección de código
       this.idCategory = params['idCategory'];
     });    
  }

  continue($event): void {
    if (this.categoryNavigator) {
      this.categoryNavigator.continue(event);
    }
  }

}
