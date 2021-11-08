import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { AccordionRadioGroupComponent } from './accordion-radio-group.component';

@Component({
  selector: 'accordion-radio',
  templateUrl: './accordion-radio.component.html',
  styleUrls: ['./accordion-radio.component.css']
})
export class AccordionRadioComponent  implements AfterContentInit {
  @ContentChildren(AccordionRadioGroupComponent) 
  groups: QueryList<AccordionRadioGroupComponent>;

  /**
   * Invoked when all children (groups) are ready
   */
  ngAfterContentInit() {
    // console.log (this.groups);
    // Set active to first element
    // this.groups.toArray()[0].opened = true;
    
    // Loop through all Groups
    this.groups.toArray().forEach((t) => {
      // when title bar is clicked
      // (toggle is an @output event of Group)
      t.toggle.subscribe(() => {
        // Open the group
        this.openGroup(t);
      });
      /*t.toggle.subscribe((group) => {
        // Open the group
        this.openGroup(group);
      });*/
    });
  }

  /**
   * Open an accordion group
   * @param group   Group instance
   */
  openGroup(group: any) {
    // close other groups
    // this.groups.toArray().forEach((t) => t.opened = false);
    // open current group
    group.opened = !group.opened;
  }
}
