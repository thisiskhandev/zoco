import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChildrenPolicyModel } from './shared/children-policy.model';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-children-policy',
  templateUrl: './children-policy.component.html',
  styleUrls: ['./children-policy.component.css']
})
export class ChildrenPolicyComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model : ChildrenPolicyModel;

  constructor(private formBuilder: FormBuilder) { 
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.initEmptyForm(this.formBuilder);
  }
  
}
