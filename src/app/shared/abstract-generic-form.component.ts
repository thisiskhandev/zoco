import { FormGroup, FormBuilder } from "@angular/forms";
import { Utilities } from "@shared/utilities";
import { Input, Output, EventEmitter, Directive } from "@angular/core";

@Directive()
export abstract class AbstractGenericFormComponent {
    
    formGroup: FormGroup;
    @Input () model: any;
    @Output() isValid = new EventEmitter();
    children : Array<AbstractGenericFormComponent>
    utilities: Utilities;
    viewChildComponentsStatus: Array<boolean> = [];
    viewErrorMessage: string = 'Please review everything in the view';

    constructor() {
        this.utilities = new Utilities();
    }

    abstract initForm(): void;
    abstract ngOnInit(): void;
    
    onSubmit(): any {
    }

    public isReadyToContinue(): boolean {
        return true;
    }

    public getModel(): any {
        return this.model;        
    } 

    public setModel(model: any): void {
        this.model = model;
    }

    protected initEmptyForm(formBuilder: FormBuilder) {
        this.formGroup = formBuilder.group( { } );
    }

    /** VALIDAR SU NECESIDAD */
    ngAfterViewInit() {
        this.addChildrenToForm();
    }

    protected addChildrenToForm() {
        if (this.children) {
            this.children.forEach(child =>
                {
                    this.formGroup.addControl(child.constructor.name, child.formGroup);
                    child.formGroup.setParent(this.formGroup);  
                });
        }
    }

    protected setValueChangeListener(): void {
        this.formGroup.valueChanges.subscribe(() => {
            this.isValid.emit(this.formGroup.valid)
          });
    }

    public isEveryChildComponentValid(): boolean {
        let everyComponentIsValid = false;
        
        for(let i = this.utilities.emptyLength;i<this.viewChildComponentsStatus.length;i++) {
            everyComponentIsValid = this.viewChildComponentsStatus[i];
            if(everyComponentIsValid === false) {
                break;
            }
        }
        return everyComponentIsValid;
    }  

}