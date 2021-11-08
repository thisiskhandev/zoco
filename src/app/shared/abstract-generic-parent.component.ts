import { OnChanges, Input, SimpleChanges, Directive } from "@angular/core";
import { AbstractGenericFormEnum } from "@shared/abstract-generic-form-enum";
import { CookieService } from "ngx-cookie-service";
import { Utilities } from "@shared/utilities";
import { AbstractGenericFormComponent } from "@shared/abstract-generic-form.component";


@Directive()
export abstract class AbstractGenericParentComponent extends AbstractGenericFormComponent implements OnChanges {
    
    @Input () completeInfo : any;
    
    constructor() {
        super();
    }

    abstract initForm(): void;
    abstract ngOnInit(): void;
    abstract onSubmit(): any;
    viewErrorMessage: string = 'Please review everything in the view';
    
    ngOnChanges(changes: SimpleChanges) {
        for (let name in changes) {
          if(name == AbstractGenericFormEnum.completeInfoVariableName && this.completeInfo) {
            this.model.setData(this.completeInfo);
            break;
          }
        }
    }

    public isReadyToContinue(): boolean {
        return true;
    }
    
    isEdit(cookieService: CookieService): boolean {
        let selectedComponenttId = cookieService.get(AbstractGenericFormEnum.selectedComponentIdCookieName);
        return (selectedComponenttId !== '');
    }
}