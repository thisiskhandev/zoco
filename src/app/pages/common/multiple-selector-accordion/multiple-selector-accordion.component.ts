import { AbstractGenericFormComponent } from "@shared/abstract-generic-form.component";
import { OnInit, Input, Component, ViewChild, OnChanges, SimpleChanges } from "@angular/core";
import { FormArray, FormBuilder } from "@angular/forms";
import { GenericModel } from "@shared/generic-model";
import { Utilities } from "@shared/utilities";
import { MultipleSelectorComponent } from "@commons/multiple-selector/multiple-selector.component";
import { MultipleSelectorEnum } from "@commons/multiple-selector/shared/multiple-selector-enum";
import { MultipleSelectorAccordionEnum } from "@commons/multiple-selector-accordion/shared/multiple-selector-accordion-enum";


@Component({
  selector: 'app-multiple-selector-accordion',
  templateUrl: './multiple-selector-accordion.component.html',
  styleUrls: ['./multiple-selector-accordion.component.css']
})
export class MultipleSelectorAccordionComponent  extends AbstractGenericFormComponent implements OnInit {

  itemsTypesForm = new FormArray([]);
  utilitiesConst = Utilities;

  @Input() model = [];
  @Input() name:string;
  @Input() itemsTypes: Array <GenericModel>;
  @Input() requiredField: string = Utilities.falseString;
  @Input() displayAccordion: boolean = false;
  @ViewChild(MultipleSelectorComponent) multipleSelectorComponent;
  
  constructor(private formBuilder: FormBuilder) {
    super();
    this.initForm();
  }

  ngAfterViewInit() {
    this.formGroup.addControl(MultipleSelectorAccordionEnum.selector, this.multipleSelectorComponent.formGroup);
    this.multipleSelectorComponent.formGroup.setParent(this.formGroup);
  }

  initForm() {
    this.formGroup = this.formBuilder.group( { } );
  }

  ngOnInit() {
  }

  onSubmit() {
    return this.model;
  }

}
