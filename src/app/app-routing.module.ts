import { NgModule } from '@angular/core';
import { Routes, RouterModule, Data } from '@angular/router';
import { BasicInformationHotelComponent } from './pages/hotel/basic-information-hotel/basic-information-hotel.component';
import { BaseNavigatorComponent } from './pages/base-navigator/base-navigator.component';
import { GeneralDescriptionHotelComponent } from './pages/hotel/general-description-hotel/general-description-hotel.component';
import { BaseListComponent } from './pages/base-list/base-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ViewDetailsHotelComponent } from './pages/hotel/view-details-hotel/view-details-hotel.component';
import { ViewDetailsTransferComponent } from './pages/transfer/view-details-transfer/view-details-transfer.component';
import { AuthorizatedGuard } from './pages/com.usblick.common/guard/authorizated.guard';
import { ViewDetailsActivityComponent } from './pages/activities/view-details-activity/view-details-activity.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'hotels', redirectTo: 'base-list/hotels', pathMatch: 'full'},
  { path: 'transfers', redirectTo: 'base-list/transfers', pathMatch: 'full' },
  { path: 'activities', redirectTo: 'base-list/activities', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthorizatedGuard]},
  { path: 'base-navigator/:idCategory', component: BaseNavigatorComponent, canActivate:[AuthorizatedGuard]  },
  { path: 'base-navigator/:idCategory/:idItem', component: BaseNavigatorComponent, canActivate:[AuthorizatedGuard] },
  { path: 'base-list/:idList', component: BaseListComponent, canActivate:[AuthorizatedGuard] },
  { path: 'base-list', component: BaseListComponent, canActivate:[AuthorizatedGuard] },
  { path: 'base-navigator/hotels/view-details/:idItem', component: ViewDetailsHotelComponent, canActivate:[AuthorizatedGuard] },
  { path: 'base-navigator/transfer/view-details-transfer/:idItem', component: ViewDetailsTransferComponent, canActivate:[AuthorizatedGuard] },
  { path: 'base-navigator/activities/view-details/:idItem', component: ViewDetailsActivityComponent, canActivate:[AuthorizatedGuard] },
  { path: 'base-navigator/:idCategory/rates/:idItem', component: BaseNavigatorComponent, canActivate:[AuthorizatedGuard] },
  { path: 'base-navigator/:idCategory/features', component: BaseNavigatorComponent, canActivate:[AuthorizatedGuard] },
  { path: 'base-navigator/:idCategory/settings', component: BaseNavigatorComponent, canActivate:[AuthorizatedGuard] },
  { path: 'base-navigator/:idCategory/drivers', component: BaseNavigatorComponent, canActivate:[AuthorizatedGuard] },
  // TODO:  Eliminar esta entrada cuando se tenga el servicio completeInfo de activities para enviar el id por una cookie
  { path: 'base-navigator/:idCategory/rates', component: BaseNavigatorComponent, canActivate:[AuthorizatedGuard] },
  { path: 'general-description-hotel', component: GeneralDescriptionHotelComponent, canActivate:[AuthorizatedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
