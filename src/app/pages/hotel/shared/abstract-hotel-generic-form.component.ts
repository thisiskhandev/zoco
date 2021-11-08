
import { OnInit, Input, OnChanges, SimpleChanges, Directive } from "@angular/core";
import { NavigatorEnum } from '../shared/navigator-enum';
import { Utilities } from '@shared/utilities';
import { CookieService } from 'ngx-cookie-service';
import { AbstractGenericFormComponent } from "@shared/abstract-generic-form.component";


@Directive()
export abstract class AbstractHotelGenericFormComponent extends AbstractGenericFormComponent implements OnInit {

    @Input () hotelCompleteInfo : any;

    abstract initForm(): void;
    abstract transformGroupToModel(): void;
    abstract ngOnInit(): void;
    abstract onSubmit(): any;

    
    ngOnChanges(changes: SimpleChanges) {
        for (let name in changes) {
          if(name == NavigatorEnum.hotelCompleteInfoVariableName && this.hotelCompleteInfo !== undefined) {
            this.model.setData(this.hotelCompleteInfo);

            this.initForm();
            this.emitDataChange();
            break;
          }
        }
    }
    
    emitDataChange(): void {}

    isEdit(cookieService: CookieService): boolean {
        let selectedEstablishmentId = cookieService.get(NavigatorEnum.selectedEstablishmentIdCookieName);
        return (selectedEstablishmentId !== '');
    }

}