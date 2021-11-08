import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { CommonLoadingModalEnum } from './shared/common-loading-modal.enum';

@Component({
  selector: 'app-common-loading-modal',
  templateUrl: './common-loading-modal.component.html',
  styleUrls: ['./common-loading-modal.component.css']
})
export class CommonLoadingModalComponent implements OnInit {

  height: string;


  constructor(
    private dialogRef: MatDialogRef<CommonLoadingModalComponent>, config: NgbProgressbarConfig
  ) { 
    config.striped = true;
    config.animated = true;
    this.height = CommonLoadingModalEnum.height;
  }

  ngOnInit() {
  }

}
